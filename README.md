````markdown
# gh2jsdelivr

Convert GitHub file URLs to jsDelivr CDN links.

## Supported Formats

- `https://github.com/user/repo/blob/branch/path/file`
- `https://raw.githubusercontent.com/user/repo/branch/path/file`

## Usage

```bash
node convert.js <github-url>
```
````

**Example:**

```bash
node convert.js "https://github.com/dzombies45/bot-assets/blob/main/assets/banner.png"
# https://cdn.jsdelivr.net/gh/dzombies45/bot-assets@main/assets/banner.png
```

## Install as Global Command

```bash
chmod +x convert.js
mv convert.js ~/bin/gh2jsdelivr
```

Then use from anywhere:

```bash
gh2jsdelivr "https://github.com/dzombies45/bot-assets/blob/main/assets/banner.png"
```

> Make sure `~/bin` is in your `PATH`.

```

Singkat dan to the point — tidak perlu lebih dari ini untuk script sekecil itu.
```
