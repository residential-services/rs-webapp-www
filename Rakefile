# Rakefile for building the Jekyll project.
# (see also: the 'build' script file which provides an
# alternative implementation of the build process)
# 
# TODO: check code quality


namespace :local do 
	desc 'Start the local web server'
	task :serve do
		sh "bundle exec jekyll serve --livereload --incremental" 
	end
	
	desc 'Build the static website'
	task :build do
		sh "bundle exec jekyll build --source . --destination ../residential-services.github.io  --incremental --verbose" 
	end

	desc 'Update gems'
	task :update_gems do
		sh "bundle install" 
	end
end


__END__

desc 'See minified_site'
task default: :minified_site



# File tasks ##########################

require "rake/clean"

CLOBBER.include '3_minified_static_site'
CLEAN.include   '2_static_site'

# group files by treatment method
FILES = {
	static:   {},
	minified: {}
}
[:js, :css, :html, :remaining].each do |key|
	FILES[:static][key] = FileList["2_static_site/**/*#{key == :remaining ? '' : '.'+key.to_s}"]
# 	$stderr.puts "#{FILES[:static][key]}\n\n\n" 
end

# remove directories from file lists
FILES[:static].each_key do |key|
	FILES[:static][key].exclude do |file|
		next true if File.directory? file
		false
	end
end

# exclude some files from groups 
FILES[:static].each_key do |key|
	next if key == :remaining
	FILES[:static][key].exclude '2_static_site/vendor/**/*' 
	FILES[:static][key].exclude "2_static_site/**/*.min.#{key}"
	FILES[:static][:remaining].exclude *FILES[:static][key]
end

# build destination file lists
FILES[:static].each_key do |key|
	FILES[:minified][key] = FILES[:static][key].pathmap('%{^2_static_site,3_minified_static_site}d/%f')
end

# build 'file' and 'directory' tasks
FILES[:static].each_key do |key|
	FILES[:static][key].zip FILES[:minified][key] do |source_target| 
		src, dest = *source_target
		dest_dir = dest.pathmap('%d')
	#	puts "#{src} #{dest}" 
		directory dest_dir
		file dest => [dest_dir, src] do
			sh "uglifyjs -o '#{dest}' '#{src}'" if key == :js
			sh "cleancss -o '#{dest}' '#{src}'" if key == :css
			sh "html-minifier --remove-comments --remove-comments-from-cdata --collapse-whitespace --minify-css -o '#{dest}' '#{src}'" if key == :html
			cp src, dest if key == :remaining
		end
	end
end



# High-level tasks ##########################

desc 'Build a minified static site from Jekyll project'
task minified_site: [
#	:clobber,
	:static_site, 
	*FILES[:minified][:js], *FILES[:minified][:css], *FILES[:minified][:html], *FILES[:minified][:remaining]
]

desc 'Build a static site from Jekyll project'
task static_site: [
#	:clean
] do 
	sh "jekyll build --source 1_jekyll_project --destination 2_static_site"
end

