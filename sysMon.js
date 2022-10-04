const si = require('systeminformation');
const { ipcMain } = require('electron')
const os = require('os');
const fs = require('fs');
const spawn = require("child_process").spawn;





ipcMain.on('pythonProgram', e => {
    let pythonProcess = spawn('python', ["./sysMon.py"]);
    pythonProcess.stdout.on('data', (data) => {

        fs.readFile('Logs/Temps.txt', encoding = 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }

            let temps = data.toString().split("\n");
            let tempsStr = ['Nuvoton'];
            let tempsDataArray = [];
            let hddStr = 'HDD';
            let hddArray = [];
            let cpuStr = 'CPU Core';
            let cpuArray = [];


            for (i in temps) {
                if (temps[i].match(cpuStr)) {
                    let tempSlice1 = temps[i].slice(-26, -12)
                    let tempsSlice2 = temps[i].slice(-12)
                    // console.log(tempSlice1)
                    // console.log(tempsSlice2)
                    cpuArray.push(tempSlice1, tempsSlice2);
                }
                if (temps[i].match(hddStr)) {

                    let hddSlice1 = temps[i].slice(0, 26)
                    let hddSlice2 = temps[i].slice(-13);
                    hddArray.push(hddSlice1, hddSlice2);
                }

                if(temps[i].match(tempsStr)){
                    let tempsDataSlice1 = temps[i].slice(67,-6);

                    tempsDataArray.push(parseInt(tempsDataSlice1))
                }
            }

            e.sender.send('pythonProgram', [cpuArray, hddArray,tempsDataArray]);
            // console.log(tempsDataArray)

        });


    fs.readFile('Logs/Load.txt', encoding = 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        let gpuLoad = data.toString().split("\n");
        let gpuStr = ['Video Engine ', 'GPU Frame Buffer', 'Bus Interface','GPU Memory','GPU Core'];
        let gpuArray = [];
        let hddLoadStr='Load #0 Used'
        let hddLoadArray=[];
        let hddLoadStr_1='CPU Core'
        let hddLoadArray1=[];
        hddLoadArray2=[];

        // let hddLoadArray2=[];

        for (i in gpuLoad) {
            for (j in gpuStr){
                if (gpuLoad[i].match(gpuStr[j])) {
                    let gpuLoadSlice1 = gpuLoad[i].slice(0, 27 );
                    let gpuLoadSlice2 = gpuLoad[i].slice(-19);
                    gpuArray.push(gpuLoadSlice1, gpuLoadSlice2)
                }}
                if(gpuLoad[i].match(hddLoadStr)){
                    let hddLoadSlice1 = gpuLoad[i].slice(0, 20 );
                    let hddLoadSlice2 = gpuLoad[i].slice(-19);
                    hddLoadArray.push(hddLoadSlice1, hddLoadSlice2)
                }
                if(gpuLoad[i].match(hddLoadStr_1)){
                    let hddLoadDataSlice1 = gpuLoad[i].slice(26,-9 );

                    hddLoadArray1.push(hddLoadDataSlice1)
                }
                // if(gpuLoad[i].match(hddLoadStr_1)){
                //     let hddLoadDataSlice1 = gpuLoad[i].slice(26,-9 );

                //     hddLoadArray2.push(parseInt(hddLoadDataSlice1))
                // }
                if(gpuLoad[i].match(hddLoadStr)){
                    let hddLoadSlice2 = gpuLoad[i].slice(-18,-9);
                    hddLoadArray2.push( hddLoadSlice2)
                }
        }

        console.log(gpuArray)
        console.log(hddLoadArray)
        console.log(hddLoadArray1)
        console.log(hddLoadArray2)

        e.sender.send('pythonProgram1',[gpuArray,hddLoadArray,hddLoadArray1,hddLoadArray2]);


    })
    fs.readFile('Logs/Power.txt', encoding = 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        // console.log(data)
        let power = data.toString().split("\n");
        let powerStr = 'Power';
        let powerArray = [];
        // console.log(power)
        for (i in power) {

                if(power[i].match(powerStr)){
                    let powerSlice1 = power[i].slice(23,49);
                    let powerSlice2 = power[i].slice(-13);
                    powerArray.push(powerSlice1, powerSlice2)
                }

        }

        // console.log(powerArray)

        e.sender.send('pythonProgram2',powerArray);


    })



    fs.readFile('Logs/Fan.txt', encoding = 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        let fan = data.toString().split("\n");
        let fanStr = 'Fan Speed';
        let fanArray = [];
        let fanArray1 = [];

        // console.log(fan)
        for (i in fan) {

                if(fan[i].match(fanStr)){
                    let fanSlice1 = fan[i].slice(-34,-13);
                    let fanSlice2 = fan[i].slice(-13);
                    fanArray.push( fanSlice1, fanSlice2)
                }
                if(fan[i].match(fanStr)){

                    let fanSlice2 = fan[i].slice(-13);
                    fanArray1.push(fanSlice2)
                }

        }

        console.log(fanArray1)

        e.sender.send('pythonProgram3',fanArray,fanArray1);


    })

})
})


//system monitoring
const sysMon = () => {

    //OS
    ipcMain.on('os-info', e => {
        // CPU information
        si.osInfo().then(osi => {
            const osInfo = [];
            osInfo.push(osi.platform);
            //osInfo
            e.sender.send('os-info', osInfo);
            //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    //CPU
    ipcMain.on('cpu-info', e => {
        // CPU information
        si.cpu().then(cpu => {
            const cpuInfo = [];
            cpuInfo.push(cpu.manufacturer, cpu.brand, cpu.cores);
            //console.log(cpu['manufacturer']);
            //cpuInfo.push(cpu['brand']);
            //cpuInfo.push(cpu['cores']);
            e.sender.send('cpu-info', cpuInfo);
            //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    ipcMain.on('cpu-temp-info', e => {
        // CPU information
        si.cpuTemperature().then(cpuTemperature => {
            const cpuTemp = [];
            cpuTemp.push(cpuTemperature.main, cpuTemperature.max, cpuTemperature.cores);
            //console.log(cpu['temp main']);
            //cpuInfo.push(cpu['temp max']);
            // console.log("test2");
            e.sender.send('cpu-temp-info', cpuTemp);
            // console.log("test3");
            //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    //GPU
    ipcMain.on('gpu-info', e => {
        // GPU information
        si.graphics().then(graphics => {
            const gpu = [];
            gpu.push(graphics.controllers[0].model, graphics.controllers[0].vram / 1024, graphics.controllers[0].vramDynamic, graphics.displays[0].vendor, graphics.displays[0].model, graphics.displays[0].resolutionX, graphics.displays[0].resolutionY);

            //gpuInfo.push(gpu['model']);
            //gpuInfo.push(gpu['vram']);
            //gpuInfo.push(gpu['cores']);

            //gpuInfo.push(display['vendor']);
            //gpuInfo.push(display['model']);
            //gpuInfo.push(display['resolution']);
            e.sender.send('gpu-info', gpu);
            //console.log(gpuInfo);
        }).catch(error => console.error(error));
    });

    ipcMain.on('com', e => {

        // PC information
        let Uptime = os.uptime() / 60;

        let OsType = os.type()

        const com = [];
        com.push(Uptime, OsType)

        e.sender.send('com', com);

    });

    ipcMain.on('memory', e => {
        // CPU information
        si.mem().then(mem => {
            const memory = [];
            total = mem.total / 1073741824;
            let FreeMemory = os.freemem() / 1073741824;
            memory.push(total, FreeMemory);
            //osInfo
            e.sender.send('memory', memory);
            //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });
}

module.exports = sysMon;
