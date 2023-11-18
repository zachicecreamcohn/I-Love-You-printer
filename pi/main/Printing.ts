import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';
const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    driver: 'printer',
    // interface: process.argv[2],
    interface: '/dev/ttyACM0',

});


async function print(msg: string) {
    // first, confirm that the printer is connected
    // if not, then return false
    if (!await printer.isPrinterConnected()) {
        return false;
    }

    // for each line in the message, print it
    // msg.split('\n').forEach(line => {
    //     printer.println(line);
    // });
    printer.println(msg);
    printer.cut();
    await printer.execute();
    return true;
}

export default print;