# Winotify

This is a small package for easily redering toast notifications in Windows.
It is zero-dependency, based only on a series of PowerShell commands.

## Usage:

```
const Notification = require('winotifier');
const n = new Notification();
```

### API Methods:

```
.setType(string: value): this

> Sets the base icon type on notification.
> Possible options for 'value' are listed in property 'TipIcons':
    > None
    > Info
    > Error
    > Warning
> Returns the own Notification instance, so methods can be chained.
> Throws a '<invalid_icontype>' custom error if types are not compatible.
```
```
.setText(string: value): this

> Sets the base text on notification.
> Returns the own Notification instance, so methods can be chained.
> Throws a '<invalid_string>' custom error if types are not compatible.
```
```
.setTitle(string: value): this

> Sets the base title on notification.
> Returns the own Notification instance, so methods can be chained.
> Throws a '<invalid_string>' custom error if types are not compatible.
```
```
.setIcon(string: value): this

> Sets the base app icon on notification - string must be a valid icon file path.
> Returns the own Notification instance, so methods can be chained.
> Throws a '<invalid_iconfile>' custom error if types are not compatible.
> Only '.ico' files are compatible.
```
```
.setDisplayTime(number: value): this

> Sets the timeout for the notification display.
> Returns the own Notification instance, so methods can be chained.
> Throws a '<invalid_number>' custom error if types are not compatible.
> Defaults to 5000 ms.
```
```
.render(): this

> Renders the notification using the predefinde configs.
> Prints stdout, stderr, and errors if any of them is valid.
> Throws a '<invalid_instance>' custom error if a fatal error occurs.
```

### API Properties

```
.TipIcons

> Contains the names of the valid icon types for notifications:
    static TipIcons = { 
        'None':'None',
        'Info':'Info',
        'Error':'Error',
        'Warning':'Warning'  
    };
```

### Example Usage:

```
// Configures and renders a 'Warning' notification
const Notification = require('winotify');
const n = new Notification()
    .setType('Warning')
    .setTitle('This is a title')
    .setText('This is a text')
    .setIcon('C:\\somefolder\\somefile.ico')
    .render()
;
```