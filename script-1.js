let ip= document.getElementById('ip');
let country= document.getElementById('country');
let state= document.getElementById('state');
let city= document.getElementById('city');
let pin_code= document.getElementById('pin-code');
let Latitude= document.getElementById('Latitude');
let Longitude= document.getElementById('Longitude');
let isp= document.getElementById('isp');
let time_zone= document.getElementById('time-zone');

let para = document.getElementById('para')

function replace(data){
    ip.innerHTML = data.query
    country.innerHTML = data.country;
    state.innerHTML = data.regionName;
    city.innerHTML = data.city;
    pin_code.innerHTML = data.zip;
    Latitude.innerHTML = data.lat;
    Longitude.innerHTML = data.lon;
    isp.innerHTML = data.isp;
    time_zone.innerHTML = data.timezone;
}

fetch(`http://ip-api.com/json/`)
.then(responce => responce.json())
.then(function(data){
    replace(data)
})

let button = document.getElementById('button');
let input  = document.getElementById('input-ip');

button.addEventListener('click', function(){

    let ip = input.value;
    try{

        if( !(ip.split('.').length == 4) ){
            throw new Error('ip should hava exactly 4 number part saperated with 3 dots');
        }
    
        let numArray = ip.split('.')
    
        for( let i=0; i<4; i++ ){
            
            let num = Number( numArray[i] );

            if( num ){
                if( !(num>=0 && num<=255) ){
                    throw new Error(`part ${i+1} of ip is not between 0 to 255`);
                }
            }
            else{
                throw new Error(`part ${i+1} of ip is not number `);
            }
        }

        fetch(`http://ip-api.com/json/${ip}`)
        .then(responce => responce.json())
        .then(function(data){
            try{
                if( data.status == "success" ){
                    replace(data);
                    para.innerHTML = "details about searched ip address"
                }
                else{
                    throw new Error('Something went wrong!!')
                }
            }
            catch(e){
                alert(e)
            }

        })

    }
    catch(e){
        alert(e)
    }

   
})