# awsprofiles

> Manage and switch between AWS profiles

<p align="center">
  <img src="demo.gif" widthi="924" />
</p>

## What's this?

* [CLI](#cli) to switch between saved AWS profiles
* Alternative [Interactive UI](#interactive-ui)
* Inspired by [np](https://github.com/sindresorhus/np)

## Install

```bash
$ yarn global add awsprofiles
```

## CLI
```bash
$ awsprofiles --help

  A tool to manage and switch between aws profiles

  Usage
    $ awsprofiles <profile>

  Examples
    $ awsprofiles
    $ awsprofiles prod
    $ awsprofiles dev
```

## Interactive UI
Running `awsprofiles` without arguments provides an interactive UI similar to that of [np](https://github.com/sindresorhus/np)

<p align="center">
  <img src="screenshot.png" widthi="924" />
</p>

## Configuration

Expects an `~/.aws/credentials` file similar to the format below:

```
[default]
aws_access_key_id = 1xxxxxxxxxxxxxxxxxxx
aws_secret_access_key = 1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

[production]
aws_access_key_id = 1xxxxxxxxxxxxxxxxxxx
aws_secret_access_key = 1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

[sandbox]
aws_access_key_id = 2xxxxxxxxxxxxxxxxxxx
aws_secret_access_key = 2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

[a_client]
aws_access_key_id = 3xxxxxxxxxxxxxxxxxxx
aws_secret_access_key = 3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

[personal]
aws_access_key_id = 4xxxxxxxxxxxxxxxxxxx
aws_secret_access_key = 4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Tips

### Alias

I like to alias `awsprofiles` to `ap` by adding the following to `.zshrc` or `.bashrc`

```
alias ap = "awsprofiles"
```

## Special Thanks

* [np](https://github.com/sindresorhus/np)

## Created By

* [Nick Matenaar](https://github.com/nicktho)

## License

[MIT (c) Nick Matenaar](LICENSE)
