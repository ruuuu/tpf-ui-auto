const { readFileSync } = require('fs');

const dataGenerate = function () {

    const data = [{
        email: 'sberadmin',
        password: 'sberadmin',
    },

    {
        email: 'vtb',
        password: 'vtb',
    },

    {
        email: 'operator',
        password: 'operator',
    },
    ]

    return data;
}


const getArrayInnYrLiso = function () { // массив ИНН для создания ЮЛ(10-ти значные) 
    const arrayInnYrLiso = ['5017029617', '7735571170', '7735509767', '5032234258', '5020066513', '5020066471', '7840418942', '7724547369', '5407972070',
        '1435184330', '5020076529', '5402504247', '7733842219', '9718027460', '5024174020', '7710879300', '5433186001', '2801174806', '7721601723',
        '5017060590', '5024099527', '7536138645', '7704443178', '2721239367', '8604069433', '2801178656', '7329031380', '2335064176', '5024078936',
        '6685136603', '7536157863', '4501220332', '5020055455', '4202045467', '5044092819', '5406777051', '7735142220', '6671461762', '5017092760', '5404010973'
    ];
    return arrayInnYrLiso;
}




const getArrayInnIP = function () { // массив ИНН для создания ИП(12-ти значные) 
    const arrayInnIP = ['221002412850', '661400412855', '420201816829', '661709768960', '743400121000', '320401239894',
        '164811836010', '503402420621', '230900333021', '390503731620', '390508667390', '382101164390', '743804139732', '540861202965', '027415684723', '590504738430', '745303595343', '027607905782', '590699166260', '010500823922', '026822947630', '030601633198', '251135344855', '010403790809', '010514419501', '381258990106', '246521249158', '213008668608', '027714263628', '434520236144', '263401979752', '661222002460', '260806005262', '330300161542', '230600443070', '661220144727', '470604503161', '780419330374', '623004414173', '632141905851', '131100469488', '452100030598', '231702985443', '615014183420', '615000607132', '470800044080', '421401902308', '470801826588', '290117468805', '542606324800'];
    return arrayInnIP;
}


const getRandomInnYrLiso = function () { // получаем рандомный инн ЮЛ
    const arrayYrLisoInn = getArrayInnYrLiso();
    //console.log('arrayYrLisoInn  ',  arrayYrLisoInn);

    let randomInnYrLiso = arrayYrLisoInn[Math.floor(Math.random() * arrayYrLisoInn.length)];
    return randomInnYrLiso;



}


const getRandomInnIP = function () { // получаем рандомный инн ИП
    const arrayIPInn = getArrayInnIP();
    let randomInnIP = arrayIPInn[Math.floor(Math.random() * arrayIPInn.length)];
    return randomInnIP;
}


export { dataGenerate, getRandomInnYrLiso, getRandomInnIP }
