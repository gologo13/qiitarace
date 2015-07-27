Qiitarace
===========

[![NPM](https://nodei.co/npm/qiitarace.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/qiitarace/)


This script generates a ranking of [Qiita](http://qiita.com/) contributions.

## Installation

```sh
$ npm install qiitarace -g
```

## Usage

### Ranking with a user list.

Specify a user list as a connma separated string with `-u` option.

```sh
$ qiitarace -u gologo13,ktsukago

gologo13        357
ktsukago        10
```

### Ranking of an organization.

Specify a qiita organization with `-o` option.

```sh
$ qiitarace -o recruitlifestyle

gologo13        357
...
```
