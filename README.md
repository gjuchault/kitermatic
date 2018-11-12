# kitermatic

[![NpmLicense](https://img.shields.io/npm/l/kitermatic.svg)](https://github.com/gjuchault/kitermatic/blob/master/LICENSE)
[![Travis (.org)](https://img.shields.io/travis/gjuchault/kitermatic.svg)](https://travis-ci.org/gjuchault/kitermatic.svg?branch=master)
[![David](https://img.shields.io/david/gjuchault/kitermatic.svg)](https://david-dm.org/gjuchault/kitermatic)


Kitematic for the terminal :whale: :wrench:

               ###########
           ###################
         #######################
       ###########################
      ####     ###      #      ####
     #####     #      #####    #####
    ######           #######   #####
    ######           #######   ######
    ######      #     #####    ######
     #####     ###    ####     #####
     #####     ###     ###     #####
      ####     ####     #      ####
       ###########################
         #######################
           ###################
               ############

![](kitermatic.gif)

## Installation

```
npm install -g kitermatic
```

## env variables / config

| Environment variable  |             Description             | Default |
|-----------------------|-------------------------------------|---------|
| KTRM_UI_THEME_BG      | theme color                         | cyan    |
| KTRM_UI_THEME_FG      | foreground on theme                 | black   |
| KTRM_REFRESH_INTERVAL | milliseconds before refreshing list | 3000    |
| KTRM_LOGS_TAIL        | logs line to fetch                  | 1000    |

## Build

```
yarn build
```

## Development

```
yarn dev
```
