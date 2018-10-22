export default `
     _____  __  __  ____    ___  ____   _____
    | ____||  \\/  ||  _ \\  |_ _||  _ \\ | ____|
    |  _|  | |\\/| || |_) |  | | | | | ||  _|
    | |___ | |  | ||  __/   | | | |_| || |___
    |_____||_|  |_||_|     |___||____/ |_____|

    Easy MicroPython (EMP) is an open source project led by 1ZLAB 
    to provide a faster and more efficient development experience 
    for MicroPython enthusiasts.

    GitHub:   https://github.com/Fuermohao/EMP-IDE
    HomePage: http://www.1zlab.com
    Docs:     http://www.1zlab.com/doc/emp

    Before you start using it, you need to use the upip to install 
    the emp-1zlab module on your MicroPython device. Please follow 
    the instructions below:

    import upip
    upip.install('emp-1zlab')

    import emp_boot
    emp_boot.set_boot_mode()

    Enter 2, This operation will overwrite your boot.py file, and your 
    device will restart. Please follow the prompts to connect to wifi 
    after rebooting. After that, webrepl will be automatically enabled. 
    The default password is '1zlab', you can modify it in webrepl.pass.
`