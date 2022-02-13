var headers = {};
if (endpointAPIAuthToken) {
    headers.Authorization = 'Bearer ' + endpointAPIAuthToken;
}

function nFormatter(num) {
     if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(2).replace(/\.00$/, '') + 'T';
     }
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2).replace(/\.00$/, '') + 'B';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.00$/, '') + 'M';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(/\.00$/, '') + 'K';
     }
     return num;
}

$.ajax({
          url: endpointAPIconfig,
          type: 'GET',
          headers: headers
    })
    .done(function(data) {

                // results
                document.getElementById("error_log_r").innerHTML = data["log-file"];

                // connection
                document.getElementById("error_log_c").innerHTML = data["log-file"];

        });

$.ajax({
          url: endpointAPIsummary,
          type: 'GET',
	  headers: headers
    })
    .done(function(data) {

	  	// xmrig and worker info
    		document.getElementById("version").innerHTML = data.version + ' - ' + data.kind.toUpperCase();
    		document.getElementById("ua").innerHTML = data.ua;
    		document.getElementById("worker_id").innerHTML = data.worker_id;
    		document.getElementById("algo").innerHTML = data.algo;

    		// results
    		document.getElementById("diff_current").innerHTML = nFormatter(data.results.diff_current);
    		document.getElementById("results").innerHTML = data.results.shares_good + ' / ' + data.results.shares_total + ' (' + Number((data.results.shares_good / data.results.shares_total) * 100).toFixed(2) + '%)';
    		document.getElementById("avg_time").innerHTML = data.results.avg_time + ' seconds';

    		// connection
    		document.getElementById("pool").innerHTML = data.connection.pool;
    		document.getElementById("uptime").innerHTML = (data.connection.uptime / 3600).toFixed(2) + ' hours / ' + (data.connection.uptime / 86400).toFixed(2) + ' days';
    		document.getElementById("ping").innerHTML = data.connection.ping + ' ms';
    		document.getElementById("failures").innerHTML = data.connection.failures;
        });

$.ajax({
          url: endpointAPIbackends,
          type: 'GET',
          headers: headers
    })
    .done(function(data) {

    // threads
    $.each(data, function (key, row){

	if(row.hashrate != null){

	    if (aggregateThreads === 1) {
                    document.getElementById("gpu").innerHTML = document.getElementById("gpu").innerHTML + "<tr><th>" + row.type + "</th><td>" + row.hashrate[0] + "</td><td>" + row.hashrate[1] + "</td><td>" + row.hashrate[2] + "</td></tr>";
	    } else {
	        $.each(row.threads, function (id, thread) {
                    document.getElementById("gpu").innerHTML = document.getElementById("gpu").innerHTML + "<tr><th>" + row.type + " " + id + "</th><td>" + thread.hashrate[0] + "</td><td>" + thread.hashrate[1] + "</td><td>" + thread.hashrate[2] + "</td></tr>";
                });
	    }

            document.getElementById("gpu").innerHTML = document.getElementById("gpu").innerHTML + "<tr><th>Totals (" + row.type + ")</th><th id='tot10'>" + Number(row.hashrate[0]).toFixed(1) + "</th><th id='tot60'>" + Number(row.hashrate[1]).toFixed(1) + "</th><th id='tot900'>" + Number(row.hashrate[2]).toFixed(1); + "</th></tr>";
	}

    });

});


// footer information
document.getElementById("api").innerHTML = endpointAPI;
document.getElementById("alarm").innerHTML = alarmThreshold.toLocaleString('en-GB');
document.getElementById("timer").innerHTML = timer + ' seconds';

// alert for hashrate drop
var audio = new Audio('media/hell.wav');
setInterval(function() {
    var tot10 = Number(document.getElementById("tot10").innerText).toFixed(0);
    if (tot10 < alarmThreshold) {
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
