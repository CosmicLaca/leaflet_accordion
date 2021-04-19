$(document).ready(function() {
    var overlayMaps = {};

    var OSMBase = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OSM Team</a>'
    });
    var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    var CyclOSM = L.tileLayer('https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var googleStreets = L.tileLayer('http://{s}.google.cn/maps/vt?lyrs=m@189&gl=en&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3', 'www'],
        attribution: 'google street view'
    });
    var googleHybrid = L.tileLayer('http://{s}.google.cn/maps/vt?lyrs=y@189&gl=en&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3', 'www'],
        attribution: 'google hybrid view'
    });
    var GoogleSat = L.tileLayer('http://{s}.google.cn/maps/vt?lyrs=s@189&gl=en&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3', 'www'],
        attribution: 'google satelite view'
    });
    var GoogleRoadmapAlt = L.tileLayer('http://{s}.google.cn/maps/vt?lyrs=r@189&gl=en&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3', 'www'],
        attribution: 'google roadmap view'
    });

    var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    });
    var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
    });
    var Stamen_TerrainBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    });

    var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    var baseMaps = {
        "OSM": OSMBase,
        "OSM Terrain": OpenTopoMap,
        "OSM HOT": OpenStreetMap_HOT,
        "OSM CyclOSM": CyclOSM,

        "Google Street": googleStreets,
        "Google Road": GoogleRoadmapAlt,
        "Google Hybrid": googleHybrid,
        "Google SAT": GoogleSat,

        "Stamen Terrain.": Stamen_Terrain,
        "Stamen W.Color": Stamen_Watercolor,
        "Stamen Terr.Backg": Stamen_TerrainBackground,

        "Stadia Light Gray": Stadia_AlidadeSmooth,
        "Stadia Dark Gray": Stadia_AlidadeSmoothDark,
        "Stadia OSM Bright": Stadia_OSMBright,
        "Stadia Outdoors": Stadia_Outdoors,
    };

    // initialize map
    var map = L.map('map', {
        center: [47.4983815, 19.0404707],
        zoom: 9
    });

    Stadia_OSMBright.addTo(map);

    L.control.layers(baseMaps, overlayMaps, {position: 'topright', collapsed: true}).addTo(map);

    setTimeout(function () {
        setTitleControl();
    }, 1000);
});

function setTitleControl() {
    this.CheckedProvider = '';
    var self = this;

    var TitleProviders = $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label > div > span');
    var TilePCounts = TitleProviders.length;
    var PrevTitleProvider = null;
    var FoundProvider = 0;
    $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label').hide();

    $.each(TitleProviders, function (TPindex, TPdata) {
        var TPLabel = trim($(this).html());
        var SplittedLabel = TPLabel.split(/(?<=^\S+)\s/);
        if (typeof SplittedLabel[1] === "undefined") {
            SplittedLabel[1] = TPLabel;
        }

        if (TPindex == 0) {
            $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label:nth-child(1)').find('div > span').html(' ' + SplittedLabel[1]);
            $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label:nth-child(1)').before('<div class="TileProviderName" data-tpn="' + SplittedLabel[0] + '">' + SplittedLabel[0] + '</div>').addClass('TPN_' + SplittedLabel[0]);
            self.CheckedProvider = SplittedLabel[0];
        }
        var AddBefore = ((TPindex + FoundProvider) + 0);
        var AddCurrent = (TPindex + FoundProvider + 1);
        if (TPindex > 0) {
            $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label:nth-child(' + AddCurrent + ')').find('div > span').text(' ' + SplittedLabel[1]);
            $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label:nth-child(' + AddCurrent + ')').addClass('TPN_' + SplittedLabel[0]);
        }
        if (PrevTitleProvider != SplittedLabel[0]) {
            if (TPindex > 0) {
                $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label:nth-child(' + AddBefore + ')').after('<div class="TileProviderName" data-tpn="' + SplittedLabel[0] + '">' + SplittedLabel[0] + '</div>');
                $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label:nth-child(' + AddBefore + ')').addClass('TileProviderBorderBottom');
            }
            FoundProvider++;
        }
        PrevTitleProvider = SplittedLabel[0];

        if ((TPindex + 1) == TilePCounts) {
            $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label:nth-child(' + AddCurrent + ')').addClass('TileProviderBorderBottom');
        }

        var Checked = $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label:nth-child(' + (TPindex + 1 + FoundProvider) + ')').children().children('input[type=radio]:checked');
        var isChecked = Checked.length;
        if (isChecked > 0) {
            self.CheckedProvider = SplittedLabel[0];
        }
    });
    $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready) > label.TPN_' + this.CheckedProvider).show();
    $('section.leaflet-control-layers-list > div.leaflet-control-layers-base:not(.TPSet_Ready)').addClass('TPSet_Ready');
}

function trim(str) {
    if (typeof str == "string") {
        var str = str.replace(/^\s+|\s+$/, '');
        return str;
    }
    return str;
}

$(document).ready(function() {
    $('body').on('click', 'section.leaflet-control-layers-list div.leaflet-control-layers-base div.TileProviderName', function (e) {
        var MainProvider = $(this).data('tpn');
        if ($(this).parent().find('label.TPN_' + MainProvider).is(":hidden")) {
            $(this).parent().find('label').hide(400);
            $(this).parent().find('label.TPN_' + MainProvider).show(800);
        }
    });
});