# Rakefile for building the Jekyll project.
# (see also: the 'build' script file which provides an
# alternative implementation of the build process)
# 
# WARNING: The --incremental option seems buggy for jekyll build and jekyll serve, so don't use it. 

DESTINATION_DIRECTORY = '../residential-services.github.io'

require 'pathname'
require 'yaml' 
require "rake/clean"

INTERNATIONALISED_SITE = 'i18n'
REDIRECTION_PAGE_TO_LOCALISED_PAGE = 'index.html'
SITE_LANGUAGES = YAML.load(Pathname.new('_data/languages.yml').read).collect {|lang| lang['code']}
SITE_URL = 'https://equa.world'

CLEAN.include *SITE_LANGUAGES, *Dir.entries(INTERNATIONALISED_SITE).collect{|f|(File.ftype("#{INTERNATIONALISED_SITE}/#{f}") == "directory" and f != '.' and f != '..')?f:nil}.compact

task default: :help

desc 'Helper'
task :help do
    sh 'rake -T'
end

# Build *************************************************
desc 'Build the static website'
task build: [:clean, :robots, *SITE_LANGUAGES] do # run dependencies in parallel
    build_redirection_pages_to_localise INTERNATIONALISED_SITE 
	sh "bundle exec jekyll build --source . --destination '#{DESTINATION_DIRECTORY}' --verbose" 	
end

desc 'Build robots.txt and sitemap.xml'
task :robots do 
    sitemap_filename = "sitemap.xml"

    # write robots.txt
    sh "echo 'Sitemap: #{SITE_URL}/#{sitemap_filename}' > '#{DESTINATION_DIRECTORY}'/robots.txt"
    urlset = ''

    # write sitemap.xml
    alternate_urls = ''
    SITE_LANGUAGES.each do |lang|
        alternate_urls += "<xhtml:link rel='alternate' hreflang='#{lang}' href='#{SITE_URL}/#{lang}/'/>
        "
    end

    SITE_LANGUAGES.each do |lang|
        url = "<url>
        <loc>#{SITE_URL}/#{lang}/</loc>
        #{alternate_urls}
    </url>
"
        urlset += "#{url}
    "
    end

    sitemap = "<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:xhtml='http://www.w3.org/1999/xhtml'>
    #{urlset}
</urlset>
"

    Pathname.new("#{DESTINATION_DIRECTORY}/#{sitemap_filename}").write sitemap
end

# Duplicate the primary language files for all secondary languages
SITE_LANGUAGES.each do |lang|
    file lang => INTERNATIONALISED_SITE do |t|
        cp_r "#{t.source}/", t.name
    end
end


# Test *************************************************
desc 'Start the local test server'
task :serve do
	sh 'bundle exec jekyll serve --livereload'
end



def build_redirection_pages_to_localise path
    Dir.entries(path).each do |name|  
        next if name == '.' or name == '..'  
        path2 = path + '/' + name  
        if File.ftype(path2) == "directory"
            build_redirection_pages_to_localise path2
        elsif File.ftype(path2) == "file"
            next unless path2 =~ /\.html$/
            ancestors = path2.split '/'
            ancestors.pop
            ancestors.shift
            next if ancestors.empty? 
            ancestors = ancestors.join '/'
            mkdir_p ancestors
            cp REDIRECTION_PAGE_TO_LOCALISED_PAGE, ancestors
        end
    end  
end
