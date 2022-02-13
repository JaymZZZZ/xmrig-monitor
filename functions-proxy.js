var headers = {};
if (endpointAPIAuthToken) {
    headers.Authorization = 'Bearer ' + endpointAPIAuthToken;
}

$.ajax({
    url: endpointAPIconfig,
    type: 'GET',
    headers: headers
})
    .done(function (data) {

        // results
        document.getElementById("access_log_r").innerHTML = data["access-log-file"];

        // connection
        document.getElementById("error_log_r").innerHTML = data["log-file"];

    });

$.ajax({
    url: endpointAPIsummary,
    type: 'GET',
    headers: headers
})
    .done(function (data) {

        // xmrig and worker info
        document.getElementById("version").innerHTML = data.version + ' - ' + data.kind.toUpperCase();
        document.getElementById("ua").innerHTML = data.ua;
        document.getElementById("worker_id").innerHTML = data.worker_id;
        document.getElementById("id").innerHTML = data.id;

        // results
        document.getElementById("results").innerHTML = data.results.accepted + ' / ' + (data.results.accepted + data.results.rejected + data.results.invalid) + ' (' + Number((data.results.accepted / (data.results.accepted + data.results.rejected + data.results.invalid)) * 100).toFixed(2) + '%)';
        document.getElementById("avg_time").innerHTML = data.results.avg_time + ' seconds';
        if (typeof (data.results.error_log) == "undefined") {
            document.getElementById("error_log_r").innerHTML = '';
        } else {
            document.getElementById("error_log_r").innerHTML = data.results.error_log;
            alert(data.results.error_log);
        }
        // connection
        document.getElementById("miners").innerHTML = data.miners.now + ' miners (max: ' + data.miners.max + ')';
        document.getElementById("uptime").innerHTML = (data.uptime / 3600).toFixed(2) + ' hours / ' + (data.uptime / 86400).toFixed(2) + ' days';
        document.getElementById("ping").innerHTML = data.results.latency + ' ms';

        //totals
        document.getElementById("tot10").innerHTML = Number(data.hashrate.total[1] * 1000).toLocaleString('en-GB') + ' H/s';
        document.getElementById("tot60").innerHTML = Number(data.hashrate.total[2] * 1000).toLocaleString('en-GB') + ' H/s';
        document.getElementById("tot12").innerHTML = Number(data.hashrate.total[3] * 1000).toLocaleString('en-GB') + ' H/s';
        document.getElementById("tot24").innerHTML = Number(data.hashrate.total[4] * 1000).toLocaleString('en-GB') + ' H/s';

    });

// footer information
document.getElementById("api").innerHTML = endpointAPI;
document.getElementById("alarm").innerHTML = alarmThreshold.toLocaleString('en-GB');
document.getElementById("timer").innerHTML = timer + ' seconds';

// alert for hashrate drop
var audio = new Audio('media/hell.wav');
setInterval(function () {
    var tot60 = (document.getElementById("tot60").innerText).replace(/\D/g, '');
    if (tot60 < alarmThreshold) {
        audio.play();
    }
}, 3000);

// create meta tag for auto-refresh
if (timer > 0) {
    var meta = document.createElement('meta');
    meta.httpEquiv = "refresh";
    meta.content = timer;
    document.getElementsByTagName('head')[0].appendChild(meta);
}