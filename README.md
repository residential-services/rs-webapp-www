# residential-services
Main website (www)

## Internationalisation

Development process:
1. Indicate in the _data/languages.yml file the list of all available languages. The first language is the primary language.
2. edit the files that are inside the directory whose name is the primary language code (example: en)
3. edit all the language files inside the _data directory. Example: _data/en.yml, _data/de.yml, _data/fr.yml. These files contain the site's content.
4. `rake serve` shows you the website for the default language.
5. `rake build` will build a static site for all available languages.


## Current
TODO: factor out company and app data from lang.yaml files. Use the "$xxxx" format for placeholders in yaml text.
