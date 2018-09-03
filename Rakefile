# Rakefile for building the Jekyll project.
# (see also: the 'build' script file which provides an
# alternative implementation of the build process)
# 
# WARNING: The --incremental option seems buggy for jekyll build and jekyll serve, so don't use it. 

DESTINATION_DIRECTORY = '../residential-services.github.io'

require 'pathname'
require 'yaml'
require "rake/clean"

SITE_LANGUAGES = YAML.load(Pathname.new('_data/languages.yml').read).collect {|lang| lang['code']}
# Secondary language files are tempfiles
CLEAN.include *(SITE_LANGUAGES[1..SITE_LANGUAGES.size])

task default: :build

# Build *************************************************
desc 'Build the static website'
multitask build: SITE_LANGUAGES do # run dependencies in parallel
	sh "bundle exec jekyll build --source . --destination '#{DESTINATION_DIRECTORY}' --verbose" 	
end


# Duplicate the primary language files for all secondary languages
SITE_LANGUAGES.each do |lang|
    next if lang == SITE_LANGUAGES.first
    file lang => SITE_LANGUAGES.first do |t|
        cp_r "#{t.source}/", t.name
    end
end


# Test *************************************************
desc 'Start the local test server'
task :serve do
	sh 'bundle exec jekyll serve --livereload'
end

