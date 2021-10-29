# A Node.js version for the ROBLOX website on SiteTest4 (Febuary 18th 2019).
 As the original uploaded by MFD Labs got deleted.
# NOTICE

There has been a major update with how the `__baseDirName` is selected, run the npm script `Build-And-Run` to automatically select the Directory and build the project,<br />
and then run it, if you wish not to build an run, then just run the file [./path.js](./path.js)

# Setup

There is a few things you will need to do before you can use this.

1. Setup your hosts file. On windows it is located in `C:\Windows\System32\drivers\etc` and on Linux it is located in `/etc/` with the file name of `hosts`.<br />
   You will need to paste the contents of the <b>[hosts.txt](./hosts.txt)</b> file on this repository,<br />
   giving administrator access to save the file, as this is a system file. This will make your system think that these hosts are binded to the given IPs,<br />
   read the first issue at the bottom of this read me to troubleshoot any possible issues that you may have when performing this or after performing it.
   There is a file <b>[appendHostsToHostsFile.js](./appendHostsToHostsFile.js)</b> that will automate the process, it will require root permissions.
2. The SSLKEYLOG library, by default this library is installed as a development dependency and referenced in [Global.asax.ts](./Assemblies/Global.asax.ts),<br />
   if you do not have a SSLKEYLOGFILE setup, and you wish to be able to debug SSL requests via Wireshark etc. You will need to setup one,<br />
   this involves you creating a file somewhere, it can be named anything, then you will need to modify your System's PATH variables to add one,<br />
   you can do this by looking up '`Edit the system environment variables.`', after that you will need to click the button at the bottom that says '`Environment variables...`',<br />
   there is a choice of where you want to add this variable to, if you want it to be available to all users on the current machine, then add it to the '`System variables`' section,<br />
   else add it to the '`User variables for YOUR_NAME`'. Click '`New...`', as the '`Variable name`', set it as '`SSLKEYLOGFILE`', for the '`Variable value`',<br />
   set it as an EXACT path to the file you made for your keylog file, it is preferrable if this path stays outside of the users directory if it's a System variable.<br />
   You can also click on '`Browse file...`' and find the path for your file. If you wish to set the SSLKEYLOGFILE for WireShark. Launch WireShark, select '`Edit -> Preferences`',<br />
   go to '`Advanced`' and lookup '`tls.keylog_file`', you will need to set this as the exact path for the SSLKEYLOGFILE Variable you set. When finished, click OK,<br />
   and then filter by HTTP traffic on the WiFi or Ethernet interface, and if you see the '`Transport Layer Security (TLS)`' layer along with the '`Hypertext Transfer Protocol (HTTP)`' layer on the same packet,<br />
   you will know that it worked.
3. SQL Setup, for this project, it uses MySQL, you will be able to use regular MySQL, and PHPMyAdmin etc. For the Tables,<br />
   you can look in the [SQL](./SQL) folder to see the CREATE commands for each table, procedure and function. Look at this folder often,<br />
   as new tables, procedures and functions will be added regularly as the project progresses.<br />
   All you need to change throughout the workspace is the references to the DB user root and the password that it uses,<br />
   you may also change the DataBase names also.
4. And finally, the cerificate for the HTTPS server. ALl you need to do here is install the certificate inside of [SSL](./SSL) (Named rootCA.crt).<br />
   When installing this, you will have the option for installing it for the current user only, or the current machine,<br />
   if you only want to be available for the current user, then install it to the current user, else install it the machine.<br />
   The next option you will need to select is '`Place all certificates in the following store`', in the '`Certificate store:`' section, paste the following in:<br />
   '`Trusted Root Certification Authorities`', this store is where all certificates are installed from trusted providers, such as if you go to google.com,<br />
   and you have never receieved the certificate for it, it will automatically get installed to the 'Trusted Root Certification Authorities' store.<br />
   The reason you have to install the certificate manually, is because it is a self-signed certificate without a CA. (Note: Everytime this certificate updates,<br />
   you will need to re-do this).

# Potential Issues.

There will be potential issues that you encounter while using this.<br />
The most common ones will include the SSLKEYLOGFILE and your hosts file.<br />
Some issues you may encounter with your hosts file may include is '`EADDRNOTAVAIL`',<br />
this is when the address is already being used, to fix this, for every update to this repository,<br />
you will need to replace the contents of your HostsFile with the contents of the <b>[hosts.txt](./hosts.txt)</b> file in this repository.<br />
Another issue can be '`EACCES: permission denied`', this mostly occurs on port `80` when hosting the HTTP servers,<br />
it is most likely a conflict issue with another service and that port/ip, you can always go to your hosts file,<br />
and change the IP that was failing.

---

Any additional issues, open an issue if you do not have a solution for it,<br />
or open a pull request if you do have a solution for it.

Have fun! <br />
\- **nsg**<br />
\- **MFDLABS Team**
