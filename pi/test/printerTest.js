import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';

// const ThermalPrinter = require('node-thermal-printer').printer;
// const PrinterTypes = require('node-thermal-printer').types;
//
    const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        driver: 'printer',
        // interface: process.argv[2],
        interface: '/dev/ttyACM0',

    });

    async function wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }


printer.println('MAXI CODE');
printer.maxiCode('4126565');

printer.newLine();
printer.newLine();
printer.println('CODE93');
printer.printBarcode('4126565');

printer.newLine();
printer.newLine();
printer.println('CODE128');
printer.code128('4126565', {
    height: 50,
    text: 1,
});

printer.newLine();
printer.newLine();
printer.println('PDF417');
printer.pdf417('4126565');

printer.newLine();
printer.newLine();
printer.println('QR');
printer.printQR('4126565');

printer.cut();
printer.execute();
