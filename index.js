const { execFile } = require('node:child_process');

class Notification {
    constructor () {
        this.BalloonTipIcon = Notification.TipIcons.None;
        this.BalloonTipText = '';
        this.BalloonTipTitle = '';
        this.Icon = '';
        this.ShowBalloonTip = 5000;
    }
    
    static TipIcons = { 
        'None':'None',
        'Info':'Info',
        'Error':'Error',
        'Warning':'Warning'  
    };
    
    static #_build (INotification) {
        let codeline = [
            '[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");',
            '$objNotifyIcon = New-Object System.Windows.Forms.NotifyIcon;',
            `$objNotifyIcon.Visible = $True;`,
            `$objNotifyIcon.Icon = "${INotification.Icon}";`,
            `$objNotifyIcon.BalloonTipIcon = "${INotification.BalloonTipIcon}";`,
            `$objNotifyIcon.BalloonTipText = "${INotification.BalloonTipText}";`,
            `$objNotifyIcon.BalloonTipTitle = "${INotification.BalloonTipTitle}";`,
            `$objNotifyIcon.ShowBalloonTip(${INotification.ShowBalloonTip})`
        ];
        return codeline;
    }

    static #_sendError (INotificationErrMsg) { 
        throw new Error (INotificationErrMsg);
    }
    
    setType (value) {
        if (value in Notification.TipIcons) {
            this.BalloonTipIcon = value;
        } else {
            Notification.#_sendError('BalloonTipIcon :: <invalid_icontype>');
        }

        return this;
    }

    setText (value) {
        if (typeof value === 'string') {
            this.BalloonTipText = value;
        } else {
            Notification.#_sendError('BalloonTipText :: <invalid_string>');
        }
                
        return this;
    }

    setTitle (value) {
        if (typeof value === 'string') {
            this.BalloonTipTitle = value;
        } else {
            Notification.#_sendError('BalloonTipTitle :: <invalid_string>');
        }
                
        return this;
    }

    setIcon (file) {
        if (typeof file === 'string') {
            this.Icon = file;
        } else {
            Notification.#_sendError('Icon :: <invalid_iconfile>');
        }

        return this;
    }

    setDisplayTime (value) {
        if (typeof value === 'number' && value > 0 && value < Number.MAX_SAFE_INTEGER) {
            this.ShowBalloonTip = value;
        } else {
            Notification.#_sendError('ShowBalloonTip :: <invalid_number>');
        }
        return this;
    }

    render () {
        execFile('powershell', Notification.#_build(this), 
            (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    Notification.#_sendError('INotification :: <invalid_instance>');
                }
                if (stdout) console.log(stdout);
                if (stderr) console.log(stderr);
            }
        );
        return this;
    }
}

module.exports = Notification;