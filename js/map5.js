
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//
//  Name:            map.js
//  Original coding: Vasilis Vlastaras (@gisvlasta), 23/07/2018.
//
//  Description:     The European Climate Risk Typology web mapping functionality.
// ================================================================================

// TODO: APPVAR

/*
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
*/

/**
 * The AppState object holds the application state.
 */
let AppState = {

  /**
   * Indicates whether the bootstrap material tooltip is enabled or not.
   */
  bootstrapMaterialTooltipEnabled: false,

  /**
   * The transparent color is used in those cases that a highly transparent color needs to be rendered.
   */
  transparentColor: { fillColor: '#ffffff', fillOpacity: 0.01 },

  /**
   * The NUTS3 panel displayed currently on the sidebar.
   */
  currentNuts3Panel: 'symbology', // ['symbology' | 'overview' | 'details']

  // Overview
  // 1.blur_on, 2.local_library, 3.center_focus_weak, all_out, language, wallpaper, calendar_today, 360, trip_origin, fullscreen, public
  //
  // Details
  // 1.blur_circular, 2.event_note, 3.[center_focus_strong, crop_free], book, class, extension, pageview, library_books, menu



  /**
   * Sets the visibility of the panels of the web page.
   */
  setPanelsVisibility: function() {
    symbologyViewModel.isVisible = (AppState.currentNuts3Panel === 'symbology');
    overviewInfoViewModel.isVisible = (AppState.currentNuts3Panel === 'overview');
    // TODO: RESIN - UNCOMMENT THIS !!!
    // detailsInfoViewModel.isVisible = (AppState.currentNuts3Panel === 'details');
  }

};

/**
 * The BaseMapLayers object provides properties and methods related to basemap layers.
 */
let BaseMapLayers = {

  /**
   * All the names of the basemap layers that are defined by the leaflet providers plugin.
   */
  leafletProviderBaseLayers: {
    OpenStreetMap: {
      Mapnik: ['OpenStreetMap.Mapnik', undefined],
      BlackAndWhite: ['OpenStreetMap.BlackAndWhite', undefined],
      DE: ['OpenStreetMap.DE', undefined],
      CH: ['OpenStreetMap.CH', undefined],
      France: ['OpenStreetMap.France', undefined],
      HOT: ['OpenStreetMap.HOT', undefined],
      BZH: ['OpenStreetMap.BZH', undefined]
    },
    OpenTopoMap: ['OpenTopoMap', undefined],
    Thunderforest: {
      OpenCycleMap: ['Thunderforest.OpenCycleMap', { apikey: '' }],
      Transport: ['Thunderforest.Transport', { apikey: '' }],
      TransportDark: ['Thunderforest.TransportDark', { apikey: '' }],
      SpinalMap: ['Thunderforest.SpinalMap', { apikey: '' }],
      Landscape: ['Thunderforest.Landscape', { apikey: '' }],
      Outdoors: ['Thunderforest.Outdoors', { apikey: '' }],
      Pioneer: ['Thunderforest.Pioneer', { apikey: '' }],
    },
    OpenMapSurfer: {
      Roads: ['OpenMapSurfer.Roads', undefined],
      Grayscale: ['OpenMapSurfer.Grayscale', undefined]
    },
    Hydda: {
      Full: ['Hydda.Full', undefined],
      Base: ['Hydda.Base', undefined]
    },
    MapBox: ['MapBox', undefined],
    Stamen: {
      Toner: ['Stamen.Toner', undefined],
      TonerBackground: ['Stamen.TonerBackground', undefined],
      TonerLite: ['Stamen.TonerLite', undefined],
      Watercolor: ['Stamen.Watercolor', undefined],
      Terrain: ['Stamen.Terrain', undefined],
      TerrainBackground: ['Stamen.TerrainBackground', undefined],
      TopOSMRelief: ['Stamen.TopOSMRelief', undefined],
      TonerHybrid: ['Stamen.TonerHybrid', undefined],
      TonerLines: ['Stamen.TonerLines', undefined],
      TonerLabels: ['Stamen.TonerLabels', undefined],
      TopOSMFeatures: ['Stamen.TopOSMFeatures', undefined]
    },
    Esri: {
      WorldStreetMap: ['Esri.WorldStreetMap', undefined],
      DeLome: ['Esri.DeLome', undefined],
      WorldTopoMap: ['Esri.WorldTopoMap', undefined],
      WorldImagery: ['Esri.WorldImagery', undefined],
      WorldTerrain: ['Esri.WorldTerrain', undefined],
      WorldShadedRelief: ['Esri.WorldShadedRelief', undefined],
      WorldPhysical: ['Esri.WorldPhysical', undefined],
      OceanBaseMap: ['Esri.OceanBasemap', undefined],
      NatGeoWorldMap: ['Esri.NatGeoWorldMap', undefined],
      WorldGrayCanvas: ['Esri.WorldGrayCanvas', undefined]
    },
    HERE: {
      normalDay: ['HERE.normalDay', {app_id: '', app_code: ''}],
      basicMap: ['HERE.basicMap', {app_id: '', app_code: ''}],
      hybridDay: ['HERE.hybridDay', {app_id: '', app_code: ''}]
    },
    FreeMapSK: 'FreeMapSK',
    MtbMap: ['MtbMap', undefined],
    CartoDB: {
      Positron: ['CartoDB.Positron', undefined],
      PositronNoLabels: ['CartoDB.PositronNoLabels', undefined],
      PositronOnlyLabels: ['CartoDB.PositronOnlyLabels', undefined],
      DarkMatter: ['CartoDB.DarkMatter', undefined],
      DarkMatterNoLabels: ['CartoDB.DarkMatterNoLabels', undefined],
      DarkMatterOnlyLabels: ['CartoDB.DarkMatterOnlyLabels', undefined]
    },
    HikeBike: {
      HikeBike: ['HikeBike.HikeBike', undefined],
      HillShading: ['HikeBike.HillShading', undefined]
    },
    BasemapAT: {
      basemap: ['BasemapAT.basemap', undefined],
      grau: ['BasemapAT.grau', undefined],
      overlay: ['BasemapAT.overlay', undefined],
      highdpi: ['BasemapAT.highdpi', undefined],
      orthophoto: ['BasemapAT.orthophoto', undefined]
    },
    nlmaps: {
      standaard: ['nlmaps.standaard', undefined],
      pastel: ['nlmaps.pastel', undefined],
      grijs: ['nlmaps.grijs', undefined],
      luchtfoto: ['nlmaps.luchtfoto', undefined]
    },
    NASAGIBS: {
      ModisTerraTrueColorCR: ['NASAGIBS.ModisTerraTrueColorCR', undefined],
      ModisTerraBands367CR: ['NASAGIBS.ModisTerraBands367CR', undefined],
      ViirsEarthAtNight2012: ['NASAGIBS.ViirsEarthAtNight2012', undefined]
    },
    NLS: ['NLS', undefined],
    Wikimedia: ['Wikimedia', undefined]
  },

  /**
   * All the names of the overlay layers that are defined by the leaflet providers plugin.
   */
  leafletProviderOverlayLayers: {
    OpenInfraMap: {
      Power: ['OpenInfraMap.Power', undefined],
      Telecom: ['OpenInfraMap.Telecom', undefined],
      Petroleum: ['OpenInfraMap.Petroleum', undefined],
      Water: ['OpenInfraMap.Water', undefined]
    },
    OpenSeaMap: ['OpenSeaMap', undefined],
    OpenPtMap: ['OpenPtMap', undefined],
    OpenRailwayMap: ['OpenRailwayMap', undefined],
    OpenFireMap: ['OpenFireMap', undefined],
    SafeCast: ['SafeCast', undefined],
    OpenMapSurfer: {
      AdminBounds: ['OpenMapSurfer.AdminBounds', undefined]
    },
    Hydda: {
      RoadsAndLabels: ['Hydda.RoadsAndLabels', undefined]
    },
    Stamen: {
      TonerHybrid: ['Stamen.TonerHybrid', undefined],
      TonerLines: ['Stamen.TonerLines', undefined],
      TonerLabels: ['Stamen.TonerLabels', undefined],
      TopOSMFeatures: ['Stamen.TopOSMFeatures', undefined]
    },
    OpenWeatherMap: {
      Clouds: ['OpenWeatherMap.Clouds', undefined],
      Pressure: ['OpenWeatherMap.Pressure', undefined],
      Wind: ['OpenWeatherMap.Wind', undefined]
    },
    NASAGIBS: {
      ModisTerraLSTDay: ['NASAGIBS.ModisTerraLSTDay', undefined],
      ModisTerraSnowCover: ['NASAGIBS.ModisTerraSnowCover', undefined],
      ModisTerraAOD: ['NASAGIBS.ModisTerraAOD', undefined],
      ModisTerraChlorophyll: ['NASAGIBS.ModisTerraChlorophyll', undefined]
    },
    JusticeMap: {
      income: ['JusticeMap.income', undefined],
      americanIndian: ['JusticeMap.americanIndian', undefined],
      asian: ['JusticeMap.asian', undefined],
      black: ['JusticeMap.black', undefined],
      hispanic: ['JusticeMap.hispanic', undefined],
      multi: ['JusticeMap.multi', undefined],
      nonWhite: ['JusticeMap.nonWhite', undefined],
      white: ['JusticeMap.white', undefined],
      plurality: ['JusticeMap.plurality', undefined]
    }
  },

  /**
   * The named base map layers.
   */
  namedBasemapLayers: {

    /**
     * The basemap layer named Light.
     */
    light: {
      name: 'Light',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Dark.
     */
    dark: {
      name: 'Dark',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Roads.
     */
    roads: {
      name: 'Roads',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Physical.
     */
    physical: {
      name: 'Physical',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Terrain.
     */
    terrain: {
      name: 'Terrain',
      leafletProvider: null,
      mapLayer: null
    },

    /**
     * The basemap layer named Satellite.
     */
    satellite: {
      name: 'Satellite',
      leafletProvider: null,
      mapLayer: null
    }

  },

  /**
   * Sets the the named base map layers.
   */
  setNamedBasemapLayers: function() {

    // Light
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenStreetMap.BlackAndWhite;
    this.namedBasemapLayers.light.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenMapSurfer.Grayscale;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.Toner;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.TonerBackground;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.Positron;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.PositronNoLabels;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.PositronOnlyLabels;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldGrayCanvas;

    // Dark
    this.namedBasemapLayers.dark.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.DarkMatter;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.CartoDB.DarkMatterOnlyLabels;

    // Roads
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenStreetMap.Mapnik
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenStreetMap.HOT;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.OpenMapSurfer.Roads;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.Full;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.RoadsAndLabels;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.TonerLite;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldStreetMap;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldGrayCanvas;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.HikeBike.HikeBike;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.RoadsAndLabels;
    this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Wikimedia;

    // Physical
    this.namedBasemapLayers.physical.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Hydda.Base;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldPhysical;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldTopoMap;

    // Terrain
    this.namedBasemapLayers.terrain.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.Terrain;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Stamen.TerrainBackground;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldTerrain;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldShadedRelief;
    //this.namedBasemapLayers.roads.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.HikeBike.HillShading;

    // Satellite
    this.namedBasemapLayers.satellite.leafletProvider = BaseMapLayers.leafletProviderBaseLayers.Esri.WorldImagery;

  },

  /**
   * Creates the BaseMap layers.
   */
  createBaseMapLayers: function() {

    // Loop through all the named basemap layers and instantiate them.
    for (let namedLayer in this.namedBasemapLayers) {
      if (this.namedBasemapLayers.hasOwnProperty(namedLayer)) {

        const nameIndex = 0;
        const optionsIndex = 1;

        let baseLayer = this.namedBasemapLayers[namedLayer];

        if (baseLayer.leafletProvider[optionsIndex] === undefined) {
          baseLayer.mapLayer = L.tileLayer.provider(baseLayer.leafletProvider[nameIndex]);
        }
        else {
          baseLayer.mapLayer = L.tileLayer.provider(
            baseLayer.leafletProvider[nameIndex],
            baseLayer.leafletProvider[optionsIndex]
          );
        }

      }
    }

  }

};

/**
 * The MapLayers object provides properties and methods related to map layers.
 */
let MapLayers = {
  // TODO: Update the documentation.

  /**
   * The NUTS3 polygons layer.
   */
  nuts3: {

    /**
     * The name of the layer.
     */
    name: 'nuts3',

    /**
     * The attribution to add on the map related to the NUTS3 layer.
     *
     * Official attribution string. The version used on the map omits UN-FAO and Turkstat.
     * Data source: GISCO - Eurostat (European Commission)
     * Administrative boundaries: © EuroGeographics © UN-FAO © Turkstat.
     */
    attribution: 'Data source: ' +
                   '<a href="http://ec.europa.eu/eurostat/web/gisco/" target="_cf">GISCO</a> - ' +
                   '<a href="http://ec.europa.eu/eurostat/" target="_cf">Eurostat</a> ' +
                   '(<a href="https://ec.europa.eu/commission/index_en/" target="_cf">European Commission</a>) - ' +
                 'Administrative boundaries: ' +
                   '© <a href="https://eurogeographics.org/" target="_cf">EuroGeographics</a>',

    /**
     * The named basemap layers.
     */
    namedBasemapLayers: {

      /**
       * Object light is used to define the styles used to render the NUTS3 layer on top of the Light Basemap.
       */
      light: {

        /**
         * The default style used to render NUTS3 polygons on top of the Light Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: '#282828', //'#4169E1',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#515151',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current NUTS3 polygon on top of the Light Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#4169e1',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The styles used to render the NUTS3 polygons based on their supergroup on top of the Light Basemap.
         */
        supergroupStyles: {
          // '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#004358', fillOpacity: 0.6 },
          // '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#1F8A70', fillOpacity: 0.6 },
          // '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FD7400', fillOpacity: 0.6 },
          // '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FFE11A', fillOpacity: 0.6 },
          // '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF8C00', fillOpacity: 0.6 },
          // '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#35478C', fillOpacity: 0.6 },
          // '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF2D00', fillOpacity: 0.6 },
          // '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#167F39', fillOpacity: 0.6 },
          // '9': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#00A388', fillOpacity: 0.6 }

          '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple.hex, fillOpacity: 0.7 },
          '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green.hex, fillOpacity: 0.7 },
          '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal.hex, fillOpacity: 0.7 },
          '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange.hex, fillOpacity: 0.7 },
          '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo.hex, fillOpacity: 0.7 },
          '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber.hex, fillOpacity: 0.7 },
          '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue.hex, fillOpacity: 0.7 },
          '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray.hex, fillOpacity: 0.7 }
        },

        /**
         * The styles used to render the NUTS3 polygons based on their group on top of the Light Basemap.
         */
        groupStyles: {
          '11': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple800.hex, fillOpacity: 0.7 },
          '12': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple600.hex, fillOpacity: 0.7 },
          '13': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple400.hex, fillOpacity: 0.7 },
          '14': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple200.hex, fillOpacity: 0.7 },
          '21': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green800.hex, fillOpacity: 0.7 },
          '22': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green600.hex, fillOpacity: 0.7 },
          '23': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green400.hex, fillOpacity: 0.7 },
          '24': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green200.hex, fillOpacity: 0.7 },
          '31': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal800.hex, fillOpacity: 0.7 },
          '32': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal600.hex, fillOpacity: 0.7 },
          '33': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal400.hex, fillOpacity: 0.7 },
          '34': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal200.hex, fillOpacity: 0.7 },
          '41': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange800.hex, fillOpacity: 0.7 },
          '42': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange600.hex, fillOpacity: 0.7 },
          '43': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange400.hex, fillOpacity: 0.7 },
          '44': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange200.hex, fillOpacity: 0.7 },
          '51': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo900.hex, fillOpacity: 0.7 },
          '52': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo700.hex, fillOpacity: 0.7 },
          '53': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo500.hex, fillOpacity: 0.7 },
          '54': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo300.hex, fillOpacity: 0.7 },
          '55': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo100.hex, fillOpacity: 0.7 },
          '61': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber800.hex, fillOpacity: 0.7 },
          '62': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber600.hex, fillOpacity: 0.7 },
          '63': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber400.hex, fillOpacity: 0.7 },
          '64': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber200.hex, fillOpacity: 0.7 },
          '71': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue800.hex, fillOpacity: 0.7 },
          '72': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue600.hex, fillOpacity: 0.7 },
          '73': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue400.hex, fillOpacity: 0.7 },
          '74': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue200.hex, fillOpacity: 0.7 },
          '81': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray800.hex, fillOpacity: 0.7 },
          '82': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray600.hex, fillOpacity: 0.7 },
          '83': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray400.hex, fillOpacity: 0.7 },
          '84': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray200.hex, fillOpacity: 0.7 }
        }

      },

      /**
       * Object dark is used to define the styles used to render the NUTS3 layer on top of the Dark Basemap.
       */
      dark: {

        /**
         * The default style used to render NUTS3 polygons on top of the Dark Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: '#d3d3d3',
          weight: 0.1,
          opacity: 1,
          fill: true,
          fillColor: '#515151',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current NUTS3 polygon on top of the Dark Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#ff4500',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The styles used to render the NUTS3 polygons based on their supergroup on top of the Dark Basemap.
         */
        supergroupStyles: {
          // '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#004358', fillOpacity: 0.6 },
          // '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#1F8A70', fillOpacity: 0.6 },
          // '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FD7400', fillOpacity: 0.6 },
          // '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FFE11A', fillOpacity: 0.6 },
          // '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF8C00', fillOpacity: 0.6 },
          // '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#35478C', fillOpacity: 0.6 },
          // '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF2D00', fillOpacity: 0.6 },
          // '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#167F39', fillOpacity: 0.6 },
          // '9': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#00A388', fillOpacity: 0.6 }

          '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.pink.hex, fillOpacity: 0.6 },
          '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green.hex, fillOpacity: 0.6 },
          '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lime.hex, fillOpacity: 0.6 },
          '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange.hex, fillOpacity: 0.6 },
          '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue900.hex, fillOpacity: 0.6 },
          '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber.hex, fillOpacity: 0.6 },
          '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.cyan.hex, fillOpacity: 0.6 },
          '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.gray.hex, fillOpacity: 0.6 }
        },

        /**
         * The styles used to render the NUTS3 polygons based on their group on top of the Dark Basemap.
         */
        groupStyles: {
          '11': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.pink800.hex, fillOpacity: 0.6 },
          '12': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.pink600.hex, fillOpacity: 0.6 },
          '13': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.pink400.hex, fillOpacity: 0.6 },
          '14': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.pink200.hex, fillOpacity: 0.6 },
          '21': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green800.hex, fillOpacity: 0.6 },
          '22': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green600.hex, fillOpacity: 0.6 },
          '23': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green400.hex, fillOpacity: 0.6 },
          '24': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green200.hex, fillOpacity: 0.6 },
          '31': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lime800.hex, fillOpacity: 0.6 },
          '32': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lime600.hex, fillOpacity: 0.6 },
          '33': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lime400.hex, fillOpacity: 0.6 },
          '34': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lime200.hex, fillOpacity: 0.6 },
          '41': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange800.hex, fillOpacity: 0.6 },
          '42': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange600.hex, fillOpacity: 0.6 },
          '43': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange400.hex, fillOpacity: 0.6 },
          '44': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange200.hex, fillOpacity: 0.6 },
          '51': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue900.hex, fillOpacity: 0.6 },
          '52': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue700.hex, fillOpacity: 0.6 },
          '53': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue500.hex, fillOpacity: 0.6 },
          '54': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue300.hex, fillOpacity: 0.6 },
          '55': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue100.hex, fillOpacity: 0.6 },
          '61': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber800.hex, fillOpacity: 0.6 },
          '62': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber600.hex, fillOpacity: 0.6 },
          '63': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber400.hex, fillOpacity: 0.6 },
          '64': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber200.hex, fillOpacity: 0.6 },
          '71': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.cyan800.hex, fillOpacity: 0.6 },
          '72': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.cyan600.hex, fillOpacity: 0.6 },
          '73': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.cyan400.hex, fillOpacity: 0.6 },
          '74': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.cyan200.hex, fillOpacity: 0.6 },
          '81': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.gray800.hex, fillOpacity: 0.6 },
          '82': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.gray600.hex, fillOpacity: 0.6 },
          '83': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.gray400.hex, fillOpacity: 0.6 },
          '84': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.gray200.hex, fillOpacity: 0.6 }
        }

      },

      /**
       * Object roads is used to define the styles used to render the NUTS3 layer on top of the Roads Basemap.
       */
      roads: {

        /**
         * The default style used to render NUTS3 polygons on top of the Roads Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: '#2f4f4f', //'#2e8b57', //'#4b0082',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#515151',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current NUTS3 polygon on top of the Roads Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#2f4f4f',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The styles used to render the NUTS3 polygons based on their supergroup on top of the Roads Basemap.
         */
        supergroupStyles: {
          // '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#004358', fillOpacity: 0.6 },
          // '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#1F8A70', fillOpacity: 0.6 },
          // '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FD7400', fillOpacity: 0.6 },
          // '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FFE11A', fillOpacity: 0.6 },
          // '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF8C00', fillOpacity: 0.6 },
          // '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#35478C', fillOpacity: 0.6 },
          // '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF2D00', fillOpacity: 0.6 },
          // '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#167F39', fillOpacity: 0.6 },
          // '9': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#00A388', fillOpacity: 0.6 }

          '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple.hex, fillOpacity: 0.7 },
          '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green.hex, fillOpacity: 0.7 },
          '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal.hex, fillOpacity: 0.7 },
          '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange.hex, fillOpacity: 0.7 },
          '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo.hex, fillOpacity: 0.7 },
          '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber.hex, fillOpacity: 0.7 },
          '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue.hex, fillOpacity: 0.7 },
          '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.red.hex, fillOpacity: 0.7 }
        },

        /**
         * The styles used to render the NUTS3 polygons based on their group on top of the Roads Basemap.
         */
        groupStyles: {
          '11': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple800.hex, fillOpacity: 0.7 },
          '12': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple600.hex, fillOpacity: 0.7 },
          '13': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple400.hex, fillOpacity: 0.7 },
          '14': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple200.hex, fillOpacity: 0.7 },
          '21': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green800.hex, fillOpacity: 0.7 },
          '22': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green600.hex, fillOpacity: 0.7 },
          '23': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green400.hex, fillOpacity: 0.7 },
          '24': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green200.hex, fillOpacity: 0.7 },
          '31': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal800.hex, fillOpacity: 0.7 },
          '32': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal600.hex, fillOpacity: 0.7 },
          '33': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal400.hex, fillOpacity: 0.7 },
          '34': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal200.hex, fillOpacity: 0.7 },
          '41': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange800.hex, fillOpacity: 0.7 },
          '42': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange600.hex, fillOpacity: 0.7 },
          '43': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange400.hex, fillOpacity: 0.7 },
          '44': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange200.hex, fillOpacity: 0.7 },
          '51': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo900.hex, fillOpacity: 0.7 },
          '52': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo700.hex, fillOpacity: 0.7 },
          '53': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo500.hex, fillOpacity: 0.7 },
          '54': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo300.hex, fillOpacity: 0.7 },
          '55': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo100.hex, fillOpacity: 0.7 },
          '61': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber800.hex, fillOpacity: 0.7 },
          '62': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber600.hex, fillOpacity: 0.7 },
          '63': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber400.hex, fillOpacity: 0.7 },
          '64': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber200.hex, fillOpacity: 0.7 },
          '71': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue800.hex, fillOpacity: 0.7 },
          '72': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue600.hex, fillOpacity: 0.7 },
          '73': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue400.hex, fillOpacity: 0.7 },
          '74': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue200.hex, fillOpacity: 0.7 },
          '81': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.red800.hex, fillOpacity: 0.7 },
          '82': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.red600.hex, fillOpacity: 0.7 },
          '83': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.red400.hex, fillOpacity: 0.7 },
          '84': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.red200.hex, fillOpacity: 0.7 }
        }

      },

      /**
       * Object physical is used to define the styles used to render the NUTS3 layer on top of the Physical Basemap.
       */
      physical: {

        /**
         * The default style used to render NUTS3 polygons on top of the Physical Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: '#282828', //'#4169E1',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#515151',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current NUTS3 polygon on top of the Physical Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#4169e1',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The styles used to render the NUTS3 polygons based on their supergroup on top of the Physical Basemap.
         */
        supergroupStyles: {
          // '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#004358', fillOpacity: 0.6 },
          // '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#1F8A70', fillOpacity: 0.6 },
          // '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FD7400', fillOpacity: 0.6 },
          // '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FFE11A', fillOpacity: 0.6 },
          // '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF8C00', fillOpacity: 0.6 },
          // '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#35478C', fillOpacity: 0.6 },
          // '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF2D00', fillOpacity: 0.6 },
          // '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#167F39', fillOpacity: 0.6 },
          // '9': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#00A388', fillOpacity: 0.6 }

          '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple.hex, fillOpacity: 0.7 },
          '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green.hex, fillOpacity: 0.7 },
          '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal.hex, fillOpacity: 0.7 },
          '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange.hex, fillOpacity: 0.7 },
          '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo.hex, fillOpacity: 0.7 },
          '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber.hex, fillOpacity: 0.7 },
          '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue.hex, fillOpacity: 0.7 },
          '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray.hex, fillOpacity: 0.7 }
        },

        /**
         * The styles used to render the NUTS3 polygons based on their group on top of the Physical Basemap.
         */
        groupStyles: {
          '11': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple800.hex, fillOpacity: 0.7 },
          '12': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple600.hex, fillOpacity: 0.7 },
          '13': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple400.hex, fillOpacity: 0.7 },
          '14': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple200.hex, fillOpacity: 0.7 },
          '21': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green800.hex, fillOpacity: 0.7 },
          '22': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green600.hex, fillOpacity: 0.7 },
          '23': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green400.hex, fillOpacity: 0.7 },
          '24': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green200.hex, fillOpacity: 0.7 },
          '31': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal800.hex, fillOpacity: 0.7 },
          '32': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal600.hex, fillOpacity: 0.7 },
          '33': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal400.hex, fillOpacity: 0.7 },
          '34': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal200.hex, fillOpacity: 0.7 },
          '41': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange800.hex, fillOpacity: 0.7 },
          '42': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange600.hex, fillOpacity: 0.7 },
          '43': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange400.hex, fillOpacity: 0.7 },
          '44': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange200.hex, fillOpacity: 0.7 },
          '51': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo900.hex, fillOpacity: 0.7 },
          '52': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo700.hex, fillOpacity: 0.7 },
          '53': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo500.hex, fillOpacity: 0.7 },
          '54': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo300.hex, fillOpacity: 0.7 },
          '55': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo100.hex, fillOpacity: 0.7 },
          '61': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber800.hex, fillOpacity: 0.7 },
          '62': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber600.hex, fillOpacity: 0.7 },
          '63': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber400.hex, fillOpacity: 0.7 },
          '64': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber200.hex, fillOpacity: 0.7 },
          '71': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue800.hex, fillOpacity: 0.7 },
          '72': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue600.hex, fillOpacity: 0.7 },
          '73': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue400.hex, fillOpacity: 0.7 },
          '74': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue200.hex, fillOpacity: 0.7 },
          '81': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray800.hex, fillOpacity: 0.7 },
          '82': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray600.hex, fillOpacity: 0.7 },
          '83': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray400.hex, fillOpacity: 0.7 },
          '84': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray200.hex, fillOpacity: 0.7 }
        }

      },

      /**
       * Object terrain is used to define the styles used to render the NUTS3 layer on top of the Terrain Basemap.
       */
      terrain: {

        /**
         * The default style used to render NUTS3 polygons on top of the Terrain Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: '#282828', //'#4169E1',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#515151',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current NUTS3 polygon on top of the Terrain Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#4169e1',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The styles used to render the NUTS3 polygons based on their supergroup on top of the Terrain Basemap.
         */
        supergroupStyles: {
          // '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#004358', fillOpacity: 0.6 },
          // '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#1F8A70', fillOpacity: 0.6 },
          // '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FD7400', fillOpacity: 0.6 },
          // '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FFE11A', fillOpacity: 0.6 },
          // '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF8C00', fillOpacity: 0.6 },
          // '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#35478C', fillOpacity: 0.6 },
          // '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF2D00', fillOpacity: 0.6 },
          // '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#167F39', fillOpacity: 0.6 },
          // '9': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#00A388', fillOpacity: 0.6 }

          '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple.hex, fillOpacity: 0.7 },
          '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green.hex, fillOpacity: 0.7 },
          '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal.hex, fillOpacity: 0.7 },
          '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange.hex, fillOpacity: 0.7 },
          '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo.hex, fillOpacity: 0.7 },
          '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber.hex, fillOpacity: 0.7 },
          '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue.hex, fillOpacity: 0.7 },
          '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray.hex, fillOpacity: 0.7 }
        },

        /**
         * The styles used to render the NUTS3 polygons based on their group on top of the Terrain Basemap.
         */
        groupStyles: {
          '11': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple800.hex, fillOpacity: 0.7 },
          '12': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple600.hex, fillOpacity: 0.7 },
          '13': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple400.hex, fillOpacity: 0.7 },
          '14': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple200.hex, fillOpacity: 0.7 },
          '21': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green800.hex, fillOpacity: 0.7 },
          '22': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green600.hex, fillOpacity: 0.7 },
          '23': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green400.hex, fillOpacity: 0.7 },
          '24': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green200.hex, fillOpacity: 0.7 },
          '31': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal800.hex, fillOpacity: 0.7 },
          '32': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal600.hex, fillOpacity: 0.7 },
          '33': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal400.hex, fillOpacity: 0.7 },
          '34': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal200.hex, fillOpacity: 0.7 },
          '41': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange800.hex, fillOpacity: 0.7 },
          '42': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange600.hex, fillOpacity: 0.7 },
          '43': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange400.hex, fillOpacity: 0.7 },
          '44': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange200.hex, fillOpacity: 0.7 },
          '51': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo900.hex, fillOpacity: 0.7 },
          '52': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo700.hex, fillOpacity: 0.7 },
          '53': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo500.hex, fillOpacity: 0.7 },
          '54': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo300.hex, fillOpacity: 0.7 },
          '55': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo100.hex, fillOpacity: 0.7 },
          '61': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber800.hex, fillOpacity: 0.7 },
          '62': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber600.hex, fillOpacity: 0.7 },
          '63': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber400.hex, fillOpacity: 0.7 },
          '64': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber200.hex, fillOpacity: 0.7 },
          '71': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue800.hex, fillOpacity: 0.7 },
          '72': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue600.hex, fillOpacity: 0.7 },
          '73': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue400.hex, fillOpacity: 0.7 },
          '74': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue200.hex, fillOpacity: 0.7 },
          '81': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray800.hex, fillOpacity: 0.7 },
          '82': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray600.hex, fillOpacity: 0.7 },
          '83': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray400.hex, fillOpacity: 0.7 },
          '84': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray200.hex, fillOpacity: 0.7 }
        }

      },

      /**
       * Object satellite is used to define the styles used to render the NUTS3 layer on top of the Satellite Basemap.
       */
      satellite: {

        /**
         * The default style used to render NUTS3 polygons on top of the Satellite Basemap.
         */
        defaultStyle: {
          stroke: true,
          color: '#282828', //'#4169E1',
          weight: 0.5,
          opacity: 1,
          fill: true,
          fillColor: '#515151',
          fillOpacity: 0.01
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The default style used to highlight the current NUTS3 polygon on top of the Satellite Basemap.
         */
        defaultHighlightingStyle: {
          stroke: true,
          color: '#4169e1',
          dashArray: '',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.4
          //lineCap: 'round',  // butt | round | square | inherit
          //lineJoin: 'round'  // miter | round | bevel | inherit
        },

        /**
         * The styles used to render the NUTS3 polygons based on their supergroup on top of the Satellite Basemap.
         */
        supergroupStyles: {
          // '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#004358', fillOpacity: 0.6 },
          // '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#1F8A70', fillOpacity: 0.6 },
          // '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FD7400', fillOpacity: 0.6 },
          // '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FFE11A', fillOpacity: 0.6 },
          // '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF8C00', fillOpacity: 0.6 },
          // '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#35478C', fillOpacity: 0.6 },
          // '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#FF2D00', fillOpacity: 0.6 },
          // '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#167F39', fillOpacity: 0.6 },
          // '9': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: '#00A388', fillOpacity: 0.6 }

          '1': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple.hex, fillOpacity: 0.7 },
          '2': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green.hex, fillOpacity: 0.7 },
          '3': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal.hex, fillOpacity: 0.7 },
          '4': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange.hex, fillOpacity: 0.7 },
          '5': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo.hex, fillOpacity: 0.7 },
          '6': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber.hex, fillOpacity: 0.7 },
          '7': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue.hex, fillOpacity: 0.7 },
          '8': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray.hex, fillOpacity: 0.7 }
        },

        /**
         * The styles used to render the NUTS3 polygons based on their group on top of the Satellite Basemap.
         */
        groupStyles: {
          '11': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple800.hex, fillOpacity: 0.7 },
          '12': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple600.hex, fillOpacity: 0.7 },
          '13': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple400.hex, fillOpacity: 0.7 },
          '14': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.purple200.hex, fillOpacity: 0.7 },
          '21': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green800.hex, fillOpacity: 0.7 },
          '22': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green600.hex, fillOpacity: 0.7 },
          '23': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green400.hex, fillOpacity: 0.7 },
          '24': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.green200.hex, fillOpacity: 0.7 },
          '31': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal800.hex, fillOpacity: 0.7 },
          '32': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal600.hex, fillOpacity: 0.7 },
          '33': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal400.hex, fillOpacity: 0.7 },
          '34': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.teal200.hex, fillOpacity: 0.7 },
          '41': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange800.hex, fillOpacity: 0.7 },
          '42': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange600.hex, fillOpacity: 0.7 },
          '43': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange400.hex, fillOpacity: 0.7 },
          '44': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.deepOrange200.hex, fillOpacity: 0.7 },
          '51': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo900.hex, fillOpacity: 0.7 },
          '52': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo700.hex, fillOpacity: 0.7 },
          '53': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo500.hex, fillOpacity: 0.7 },
          '54': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo300.hex, fillOpacity: 0.7 },
          '55': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.indigo100.hex, fillOpacity: 0.7 },
          '61': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber800.hex, fillOpacity: 0.7 },
          '62': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber600.hex, fillOpacity: 0.7 },
          '63': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber400.hex, fillOpacity: 0.7 },
          '64': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.amber200.hex, fillOpacity: 0.7 },
          '71': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue800.hex, fillOpacity: 0.7 },
          '72': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue600.hex, fillOpacity: 0.7 },
          '73': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue400.hex, fillOpacity: 0.7 },
          '74': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.lightBlue200.hex, fillOpacity: 0.7 },
          '81': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray800.hex, fillOpacity: 0.7 },
          '82': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray600.hex, fillOpacity: 0.7 },
          '83': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray400.hex, fillOpacity: 0.7 },
          '84': { stroke: true, color: '#282828', weight: 0.4, opacity: 1, fill: true, fillColor: ColorPalettes.Material.blueGray200.hex, fillOpacity: 0.7 }
        }

      }

    },

    /**
     * The leaflet map layer.
     */
    mapLayer: null,

    /**
     * The GeoJSON used to create the leaflet map layer.
     */
    geoJSON: null,

    /**
     * The dictionary used to retrieve an internal feature layer based on a feature key.
     * The key used in this case is the NUTS3 feature code.
     */
    featureToInternalLayerDictionary: {},

    /**
     * The NUTS3 feature selected by the user.
     */
    selectedFeature: null,

    /**
     * The internal layer of the selected NUTS3 feature.
     */
    selectedInternalLayer: null,

    /**
     * The dictionary that associates the typology levels to style names and attribute names.
     */
    typologyLevelDictionary: {
      'supergroups': { styleName: 'supergroupStyles', attributeName: 'SG' },
      'groups': { styleName: 'groupStyles', attributeName: 'G' }
    },

    /**
     * The supergroups metadata in the form of a dictionary whose keys are the values of supergroups.
     */
    supergroups: {
      '1': { sg: 1, groups: [11, 12, 13, 14],     visible: true, name: 'Inland and Urbanised',     description: 'NUTS3 regions in this supergroup are virtually all landlocked, and are predominantly located in Central and Western Europe. They are urbanised, and include a number of capital cities. The key climate hazards facing these regions, now and in the future, link particularly to fluvial flooding from rivers. There is the potential for increases in surface water flooding arising from projected growth in heavy rainfall events over the coming decades. Exposure of people, settlements and critical infrastructure to fluvial flooding is currently relatively high in a European context. However, due to their inland location and topography, exposure to coastal hazards and landslides is relatively low. These are relatively affluent and innovative areas with projected increases in migration and numbers of young people. They also have well developed road networks and high broadband access and bandwidth capacity. For reasons such as these, they have relatively low sensitivity to climate change hazards and high adaptive capacity. In effect, their vulnerability to climate change is relatively low. However, given that exposure to fluvial flooding is high, climate change risk remains an important issue.' },
      '2': { sg: 2, groups: [21, 22, 23, 24],     visible: true, name: 'Inland Hinterlands',       description: 'The majority of the NUTS3 regions in this supergroup are located inland, and are concentrated in Eastern Europe and Central France. They face a wide range of climate change hazards including fluvial flooding, rising temperatures and heat waves and wild fires. These NUTS3 regions show relatively high exposure of people, settlements and critical infrastructure to fluvial flooding from rivers, but less so to coastal and landslide hazards. They have relatively low provision of critical infrastructure and broadband/bandwidth capacity relative to other parts of Europe. This is related to their peri-urban and rural locations, which also reflects in their relatively low population densities and proportions of built up area. These regions have relatively low levels of GDP and employment opportunities, and as a result are in receipt of high levels of European funding via priority allocation schemes. This can also help to explain the projections for low levels of migration into these NUTS3 regions and numbers of young people in the population in the future. Due to the range of hazards that these regions face, their notable exposure to fluvial flooding and relatively high levels of vulnerability, climate change risk is an important issue.' },
      '3': { sg: 3, groups: [31, 32, 33, 34],     visible: true, name: 'Northern Lands',           description: 'As suggested by the name of this supergroup, these NUTS3 regions are located in Northern Europe. Aside from Oslo, all of Scandinavia falls within this supergroup. Also encompassed are NUTS3 regions in Western Scotland, the Baltic States and Iceland (aside from Reyjavik). As would be expected, these are cool and wet regions, although temperatures are nevertheless rising at a higher than average rate for Europe, with the number of ice days projected to fall significantly. They are also projected to experience a large increase in heavy and very heavy precipitation days compared to many other European NUTS3 regions, which may increase the chance of surface water flooding. Coastal hazards are a threat to a number of these regions, which results in high exposure of people, settlements and critical infrastructure to this hazard. These are often large regions with relatively low urban population densities and many rural settlements. Urban areas have high levels of green space, and are not densely built up. Broadband and bandwidth capacity are low, as is the density of transport networks with a low numbers of road intersections and transport nodes.  Due to low population densities, the number of critical infrastructure assets per 1000 people (e.g. airports, hospitals etc) is high from a European perspective. These are affluent and dynamic regions with projected increases in migration and numbers of young people over the coming decades. This increases their capacity to adapt to the changing climate, and lessens their level of climate risk.' },
      '4': { sg: 4, groups: [41, 42, 43, 44],     visible: true, name: 'Southern States',          description: 'This supergroup is principally Mediterranean. It\'s NUTS3 regions cover the majority of Portugal and Spain, France\'s Mediterranean coast, Italy, Croatia and Greece. These areas are hot and dry, and are projected to become increasingly so over the coming decades. Landslides and coastal hazards are a feature of these areas, with people, settlements and infrastructure currently exposed to both of these hazards, particularly landslides. High soil moisture stress and projected water consumption pressure increase the threat of drought. Critical infrastructure provision and broadband/bandwidth capacity is relatively low from a European perspective. Urban population density is above the average for European NUTS3 regions, although coverage of built up areas and green spaces in urban areas is lower than the European average. Socio-economic indicators highlight that these regions face challenges, with higher than average levels of poverty risk, and lower than average GDP, employment prospects and patent applications. These factors combine to increase vulnerability to climate change hazards and increase overall levels of climate risk.' },
      '5': { sg: 5, groups: [51, 52, 53, 54, 55], visible: true, name: 'Northern Coasts',          description: 'This supergroup covers the majority of the coastal zones of the UK, Northern France and Denmark. Parts of the Belgium, Netherlands and Northern Germany are also include. However, this supergroup does not encompass the Scandinavian or Baltic coasts. Coastal hazards are a particular feature of these NUTS3 regions. Given the high urban population densities and number of transport nodes in these areas, this translates into especially high levels of exposure of people, settlements and infrastructure to coastal hazards in comparison to other NUTS3 regions. Conversely, exposure to fluvial flooding and landslide hazards is relatively low from a European perspective.  Socio-economic factors do not suggest that these are amongst Europe\'s most affluent and dynamic regions, although also highlight that they are also not amongst the poorest. The number of young people is projected to increase as is migration, and there is relatively good access to broadband and high internet bandwidths. These factors can help to moderate levels of vulnerability to the coastal hazards that these NUTS3 regions face, although the high degree of exposure to this hazard places climate change as a key risk to economic development and health and wellbeing.' },
      '6': { sg: 6, groups: [61, 62, 63],         visible: true, name: 'Landlocked and Elevated ', description: 'This predominantly inland supergroup covers the Alpine regions, upland areas of Germany, parts of the Carpathians and France\'s Massif Central and Eastern mountain ranges. The topography and high rainfall levels contribute to landslides standing out as a key hazard facing these areas. Climate change is projected to increase the frequency and intensity of heavy and very heavy rainfall days, which could result in an even greater threat of landslides. It is therefore understandable that exposure of people, settlements and critical infrastructure to landslides is high from a European perspective. Here, high transport infrastructure densities (road intersections, transport nodes) stand out as a particular issue, although population densities are relatively low. Exposure to fluvial flooding is also relatively high. Climate change induced intensification of extreme rainfall may drive exposure levels higher still. These NUTS 3 regions are relatively affluent and innovative compared to others in Europe, and are projected to experience increasing migration in the future. It is clear that climate change poses a range of risks to these regions over the coming decades, although their relatively high levels of adaptive capacity may help to lessen levels of risk.' },
      '7': { sg: 7, groups: [71, 72, 73, 74],     visible: true, name: 'North Western Heartlands', description: 'England, Belgium and Germany dominate this supergroup, although there are outliers in France, Poland and Austria. The NUTS3 regions are predominantly landlocked. Projections highlight that they will experience an increasing number of consecutive wet days and days with heavy and very heavy rainfall.  Aside from this, the hazard profile of these regions is relatively benign. As a result, exposure to hazards including fluvial flooding, landslides and coastal hazards is low in relation to other NUTS3 regions. These are generally urban regions with above average population densities, urban built environment coverage and numbers of road intersections and transport nodes (reflecting dense transport networks). GDP, employment prospects and patent applications indicators are at a level above the European average, demonstrating higher levels of adaptive capacity to climate change hazards. This can help to moderate risks associated with increasing rainfall (and potential fluvial and surface water flood risk) that these NUTS3 regions may face in the future.' },
      '8': { sg: 8, groups: [81, 82, 83],         visible: true, name: 'Lowlands and Estuaries',   description: 'This supergroup encompasses a relatively small number of NUTS3 regions sited in low lying and estuarine locations, particularly in the Netherlands and Denmark. Other regions sharing these geographical characteristics, for example in North Eastern Italy and Northern Germany, also fall within this supergroup. The key hazards that they face are fluvial flooding and coastal hazards, to a degree that is well above the European average. Exposure of people, settlements and critical infrastructure to these hazards is also particularly high in a European context. There are relatively few people at risk of poverty, and migration levels are projected to increase. GDP, employment prospects and patent applications indicators show values that are above the average for Europe\'s NUTS3 regions. There is also relatively high critical infrastructure provision and access to broadband and high bandwidths. This suggests that capacity to adapt to hazards is relatively high and sensitivity relatively low. However, the severity of the hazards faced by these regions, and the level of exposure to these hazards, highlights that climate change stands out as a major risk factor.' }
    },

    /**
     * The groups metadata in the form of a dictionary whose keys are the values of groups.
     */
    groups: {
      '11': { g: 11, sg: 1, visible: true, name: 'This is the name of g 11', description: 'This is the description of g 11' },
      '12': { g: 12, sg: 1, visible: true, name: 'This is the name of g 12', description: 'This is the description of g 12' },
      '13': { g: 13, sg: 1, visible: true, name: 'This is the name of g 13', description: 'This is the description of g 13' },
      '14': { g: 14, sg: 1, visible: true, name: 'This is the name of g 14', description: 'This is the description of g 14' },
      '21': { g: 21, sg: 2, visible: true, name: 'This is the name of g 21', description: 'This is the description of g 21' },
      '22': { g: 22, sg: 2, visible: true, name: 'This is the name of g 22', description: 'This is the description of g 22' },
      '23': { g: 23, sg: 2, visible: true, name: 'This is the name of g 23', description: 'This is the description of g 23' },
      '24': { g: 24, sg: 2, visible: true, name: 'This is the name of g 24', description: 'This is the description of g 24' },
      '31': { g: 31, sg: 3, visible: true, name: 'This is the name of g 31', description: 'This is the description of g 31' },
      '32': { g: 32, sg: 3, visible: true, name: 'This is the name of g 32', description: 'This is the description of g 32' },
      '33': { g: 33, sg: 3, visible: true, name: 'This is the name of g 33', description: 'This is the description of g 33' },
      '34': { g: 34, sg: 3, visible: true, name: 'This is the name of g 34', description: 'This is the description of g 34' },
      '41': { g: 41, sg: 4, visible: true, name: 'This is the name of g 41', description: 'This is the description of g 41' },
      '42': { g: 42, sg: 4, visible: true, name: 'This is the name of g 42', description: 'This is the description of g 42' },
      '43': { g: 43, sg: 4, visible: true, name: 'This is the name of g 43', description: 'This is the description of g 43' },
      '44': { g: 44, sg: 4, visible: true, name: 'This is the name of g 44', description: 'This is the description of g 44' },
      '51': { g: 51, sg: 5, visible: true, name: 'This is the name of g 51', description: 'This is the description of g 51' },
      '52': { g: 52, sg: 5, visible: true, name: 'This is the name of g 52', description: 'This is the description of g 52' },
      '53': { g: 53, sg: 5, visible: true, name: 'This is the name of g 53', description: 'This is the description of g 53' },
      '54': { g: 54, sg: 5, visible: true, name: 'This is the name of g 54', description: 'This is the description of g 54' },
      '55': { g: 55, sg: 5, visible: true, name: 'This is the name of g 55', description: 'This is the description of g 55' },
      '61': { g: 61, sg: 6, visible: true, name: 'This is the name of g 61', description: 'This is the description of g 61' },
      '62': { g: 62, sg: 6, visible: true, name: 'This is the name of g 62', description: 'This is the description of g 62' },
      '63': { g: 63, sg: 6, visible: true, name: 'This is the name of g 63', description: 'This is the description of g 63' },
      '71': { g: 71, sg: 7, visible: true, name: 'This is the name of g 71', description: 'This is the description of g 71' },
      '72': { g: 72, sg: 7, visible: true, name: 'This is the name of g 72', description: 'This is the description of g 72' },
      '73': { g: 73, sg: 7, visible: true, name: 'This is the name of g 73', description: 'This is the description of g 73' },
      '74': { g: 74, sg: 7, visible: true, name: 'This is the name of g 74', description: 'This is the description of g 74' },
      '81': { g: 81, sg: 8, visible: true, name: 'This is the name of g 81', description: 'This is the description of g 81' },
      '82': { g: 82, sg: 8, visible: true, name: 'This is the name of g 82', description: 'This is the description of g 82' },
      '83': { g: 83, sg: 8, visible: true, name: 'This is the name of g 83', description: 'This is the description of g 83' }
    },

    /**
     * Creates the NUTS3 layer.
     */
    createLayer: function() {

      // TODO: RESIN - Check next line.
      // spinnerViewModel.isVisible = true;

      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      this.geoJSON = AppData.nuts3Polygons;

      this.mapLayer = L.geoJSON(this.geoJSON, {
        // style: this.namedBasemapLayers[toggleBaseMapViewModel.currentBaseMap].style,
        // style: this.namedBasemapLayers['dark'].supergroupStyles,

        /**
         * The NUTS3 layer attribution to insert on the map.
         */
        attribution: MapLayers.nuts3.attribution,

        // TODO: RESIN - Correct rendering code to allow the use of the current basemap and the current rendering method (typology supergroups / groups or indicators)
        style: function(feature) {
          // TODO: RESIN - Change next line.

          let isVisible = MapLayers.nuts3.supergroups[feature.properties.SG].visible;

          if (isVisible) {
            return MapLayers.nuts3.namedBasemapLayers[namedBaseMap].supergroupStyles[feature.properties.SG];
          }
          else {
            return MapLayers.nuts3.namedBasemapLayers[namedBaseMap].defaultStyle;
          }
        },

        /**
         * Define the behaviour of each feature.
         *
         * @param feature - The feature whose behaviour will be defined.
         * @param layer - The internal layer of each feature.
         */
        onEachFeature: function(feature, layer) {
          layer.on({

            /**
             * Raised when the mouse is over a feature.
             */
            mouseover: function() {
              MapLayers.nuts3.showTooltip(layer);
              MapLayers.nuts3.highlightNuts3(feature, layer);
            },

            /**
             * Raised when the mouse is going out of a feature.
             */
            mouseout: function() {
              MapLayers.nuts3.hideTooltip(layer);
              MapLayers.nuts3.resetNuts3Style(feature, layer, false);
              MapLayers.nuts3.reselectNuts3();
            },

            /**
             * Raised when a feature is clicked.
             */
            click: function() {
              MapLayers.nuts3.selectNuts3(feature, layer);
              MapLayers.nuts3.updateInfo(feature);
            },

            /**
             * Raised when a feature is double clicked.
             */
            dblclick: function() {
              //MapLayers.nuts3.resetNuts3Style(feature, layer);
              //alert('double clicked');
              //map.doubleClickZoom.disable();
              //map.doubleClickZoom.enable()
              // TODO: This is a problem. A click event is fired before the double click. We need to change this behaviour.
              //Spatial.map.fitBounds(layer.getBounds());
            }

          });
        }
      });

      // Add the layer in to the map and make sure it is visible.
      this.mapLayer.addTo(Spatial.map);
      this.mapLayer.bringToFront();

      // Loop through all the internal layers.
      // Create the feature to internal layer dictionary and bind the layer tooltips.
      this.mapLayer.eachLayer(function(layer) {
        MapLayers.nuts3.featureToInternalLayerDictionary[layer.feature.properties.NUTS_ID] = layer._leaflet_id;

        layer.bindTooltip('', {
          // TODO: RESIN - Check here the final tooltip options.
          direction: 'top', // TODO: RESIN - APPVAR
          offset: [0, -30], // TODO: RESIN - APPVAR
          sticky: true
        });
      });

    },

    /**
     * Renders the NUTS3 layer.
     */
    renderLayer: function() {

      // Get the current basemap. This is used to decide the symbology of the NUTS3 polygons.
      let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Get the current typology level.
      let currentTypologyLevel = symbologyViewModel.currentTab;

      // Check whether NUTS3 features exist or not.
      if (this.geoJSON !== undefined || this.geoJSON !== null) {

        // Loop through the NUTS3 features.
        for (i = 0; i < this.geoJSON.features.length; i++) {

          // Get the NUTS3 feature, attribute name and the class value.
          let feature = this.geoJSON.features[i];
          let attributeName = this.typologyLevelDictionary[currentTypologyLevel].attributeName;
          let classValue = feature.properties[attributeName].toString();

          // Render the NUTS3 polygon having the specified typology class.
          this.renderNuts3Polygon(feature, classValue, currentTypologyLevel, currentBaseMap);

        }

      }

      MapLayers.nuts3.reselectNuts3();

    },

    /**
     * Renders the specified NUTS3 polygon.
     *
     * @param feature - The feature whose style will be changed.
     * @param typologyClass - The typology class of the NUTS3 polygon.
     * @param currentTypologyLevel - The level of the typology class (ie: supergroup or group).
     * @param currentBaseMap - The current basemap.
     */
    renderNuts3Polygon: function(feature, typologyClass, currentTypologyLevel, currentBaseMap) {

      // Get the associated feature layer.
      let internalLayerKey = this.featureToInternalLayerDictionary[feature.properties.NUTS_ID];
      let featureLayer = this.mapLayer._layers[internalLayerKey];

      let basemap = this.namedBasemapLayers[currentBaseMap];

      // Set the style of the feature layer based on its typology class.
      if (this[currentTypologyLevel][typologyClass].visible) {
        let styleName = this.typologyLevelDictionary[currentTypologyLevel].styleName;
        featureLayer.setStyle(basemap[styleName][typologyClass]);
      }
      else {
        featureLayer.setStyle(basemap.defaultStyle);
      }

    },

    /**
     * Changes the style of a specified typology class.
     * @param typologyClass - The typology class whose style will be changed.
     */
    changeTypologyClassStyle: function(typologyClass) {

      // Get the current basemap. This is used to decide the symbology of the NUTS3 polygons.
      let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Get the current typology level.
      let currentTypologyLevel = symbologyViewModel.currentTab;

      // Check whether NUTS3 features exist or not.
      if (this.geoJSON !== undefined || this.geoJSON !== null) {

        // Loop through the NUTS3 features.
        for (i = 0; i < this.geoJSON.features.length; i++) {

          // Get the NUTS3 feature, attribute name and the class value.
          let feature = this.geoJSON.features[i];
          let attributeName = this.typologyLevelDictionary[currentTypologyLevel].attributeName;
          let classValue = feature.properties[attributeName].toString();

          // Render the NUTS3 polygon having the specified typology class.
          if (classValue === typologyClass) {
            this.renderNuts3Polygon(feature, typologyClass, currentTypologyLevel, currentBaseMap);
          }

        }

      }

    },

    /**
     * Highlights a NUTS3 polygon.
     *
     * @param feature - The feature that will be highlighted.
     * @param layer - The internal layer of the feature that will be highlighted.
     */
    highlightNuts3: function(feature, layer) {

      // TODO: RESIN - To Remove ???
      // // Get the named basemap layer.
      // let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;
      //
      // if (!(overviewInfoViewModel.isPinned || detailsInfoViewModel.isPinned)) {
      //   // Highlight the current NUTS3.
      //   layer.setStyle(this.namedBasemapLayers[namedBaseMap].defaultHighlightingStyle);
      //
      //   if (!L.Browser.ie && !L.Browser.opera) {
      //     layer.bringToFront();
      //   }
      // }
      //
      // // Show the overview or details view panel and then update its contents.
      // if (toggleInfoLevelViewModel.currentInfoLevel === 'overview') {
      //   if (!overviewInfoViewModel.isPinned) {
      //     overviewInfoViewModel.showView();
      //     overviewInfoViewModel.updateView(feature);
      //   }
      // }
      // else {
      //   if (!detailsInfoViewModel.isPinned) {
      //     detailsInfoViewModel.showView();
      //     detailsInfoViewModel.updateView(feature);
      //   }
      // }



      // Get the named basemap layer.
      let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Highlight the current NUTS3.
      layer.setStyle(this.namedBasemapLayers[namedBaseMap].defaultHighlightingStyle);

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }

    },

    /**
     * Resets the NUTS3 style. This is called once a mouseout event has been fired.
     *
     * @param feature - The feature that whose style will be reset.
     * @param layer - The internal layer of the feature whose style will be reset.
     * @param forceReset - Forces the function to reset the NUTS3 style.
     */
    resetNuts3Style: function(feature, layer, forceReset) {

      // TODO: RESIN - Remove this ???
      // Get the current basemap. This is used to decide the symbology of the NUTS3 polygons.
      // let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;
      //
      // // Get the current typology level.
      // let currentTypologyLevel = symbologyViewModel.currentTab;
      //
      // // Get the NUTS3 attribute name and the class value.
      // let attributeName = this.typologyLevelDictionary[currentTypologyLevel].attributeName;
      // let classValue = feature.properties[attributeName].toString();
      //
      // if (!(overviewInfoViewModel.isPinned || detailsInfoViewModel.isPinned)) {
      //   // Render the NUTS3 polygon having the specified typology class.
      //   this.renderNuts3Polygon(feature, classValue, currentTypologyLevel, currentBaseMap);
      // }
      //
      // // Hide the overview or details view panel.
      // if (toggleInfoLevelViewModel.currentInfoLevel === 'overview') {
      //   if (!overviewInfoViewModel.isPinned) {
      //     overviewInfoViewModel.hideView();
      //   }
      // }
      // else {
      //   if (!detailsInfoViewModel.isPinned) {
      //     detailsInfoViewModel.hideView();
      //   }
      // }


      // Get the current basemap. This is used to decide the symbology of the NUTS3 polygons.
      let currentBaseMap = toggleBaseMapViewModel.currentBaseMap;

      // Get the current typology level.
      let currentTypologyLevel = symbologyViewModel.currentTab;

      // Get the NUTS3 attribute name and the class value.
      let attributeName = this.typologyLevelDictionary[currentTypologyLevel].attributeName;
      let classValue = feature.properties[attributeName].toString();

      // Make sure styles of only the non selected NUTS3 polygons are reset.
      if (this.selectedFeature !== feature || forceReset) {
        // Render the NUTS3 polygon having the specified typology class.
        this.renderNuts3Polygon(feature, classValue, currentTypologyLevel, currentBaseMap);
      }

    },


    selectNuts3: function(feature, layer) {
      // if (!(overviewInfoViewModel.isPinned || detailsInfoViewModel.isPinned)) {
      //   this.selectedFeature = feature;
      //   this.selectedInternalLayer = layer;
      //
      //   if (toggleInfoLevelViewModel.currentInfoLevel === 'overview') {
      //     if (overviewInfoViewModel.isVisible) {
      //       overviewInfoViewModel.Pin();
      //     }
      //   }
      //   else {
      //     if (detailsInfoViewModel.isVisible) {
      //       detailsInfoViewModel.Pin();
      //     }
      //   }
      // }

      // Set the current NUTS3 Panel.
      if (AppState.currentNuts3Panel === 'symbology') {
        AppState.currentNuts3Panel = 'overview';
      }

      // Unselect the NUTS3 feature if a selected one exists.
      if (this.selectedFeature !== null) {
        this.deselectNuts3();
      }

      // Select the NUTS3 feature.
      this.selectedFeature = feature;
      this.selectedInternalLayer = layer;

      // Highlight the NUTS3 feature.
      this.highlightNuts3(this.selectedFeature, this.selectedInternalLayer);

      AppState.setPanelsVisibility();

    },

    deselectNuts3: function() {
      this.resetNuts3Style(this.selectedFeature, this.selectedInternalLayer, true);

      this.selectedFeature = null;
      this.selectedInternalLayer = null;
    },

    reselectNuts3: function() {
      // if (this.selectedFeature) {
      //   if (toggleInfoLevelViewModel.currentInfoLevel === 'overview') {
      //     overviewInfoViewModel.isPinned = false;
      //   }
      //   else {
      //     detailsInfoViewModel.isPinned = false;
      //   }
      //
      //   this.highlightNuts3(this.selectedFeature, this.selectedInternalLayer);
      //
      //   if (toggleInfoLevelViewModel.currentInfoLevel === 'overview') {
      //     overviewInfoViewModel.isPinned = true;
      //   }
      //   else {
      //     detailsInfoViewModel.isPinned = true;
      //   }
      // }


      if (this.selectedFeature !== null) {
        this.highlightNuts3(this.selectedFeature, this.selectedInternalLayer);
      }

    },

    updateInfo: function(feature) {
      overviewInfoViewModel.updateView(feature);
    },

    /**
     * Shows an information tooltip (name, supergroup, group) over a NUTS3 region.
     *
     * @param layer - The internal layer whose information will be displayed over using the tooltip.
     */
    showTooltip: function(layer) {

      // TODO: RESIN - This is what needs to change to support name of NUTS3 in native language.
      //this.nuts3Name = AppData.nuts3[nuts3id].nameAscii;
      //this.nuts3NativeName = AppData.nuts3[nuts3id].nutsName;

      let properties = layer.feature.properties;

      let nuts3id = properties.NUTS_ID;
      let sg = properties.SG;
      let g = properties.G;

      let html = '<div>' +

                   // ASCII Name
                   '<div>' +
                     '<h5 class="text-danger">' + AppData.nuts3[nuts3id].nameAscii + '</h5>' +
                   '</div>' +

                   '<table class="table table-sm mt-4">' +
                     '<tbody>' +

                       // Supergroup
                       '<tr>' +
                         '<td class="pb-3">' +
                           '<div class="typology-class-header">Class:</div>' +
                           '<h6>' + MapLayers.nuts3.supergroups[sg].name + '</h6>' +
                         '</td>' +
                       '</tr>' +

                       // Group
                       '<tr>' +
                         '<td>' +
                           '<div class="typology-class-header">Subclass:</div>' +
                           '<h6>' + MapLayers.nuts3.groups[g].name + '</h6>' +
                         '</td>' +
                       '</tr>' +

                     '</tbody>' +
                   '</table>' +

                 '</div>';

      layer.setTooltipContent(html);

      if (!layer.isTooltipOpen()) {
        layer.openTooltip();
      }

    },

    /**
     * Hides the information tooltip over a NUTS3 region.
     *
     * @param layer - The internal layer whose tooltip will be hidden.
     */
    hideTooltip: function(layer) {
      if (layer.isTooltipOpen()) {
        layer.closeTooltip();
      }

      layer.setTooltipContent('');
    }



  }

};

/**
 * The Spatial object provides properties and methods related to spatial operations.
 */
let Spatial = {
  // TODO: Update the documentation here.

  /**
   * The member variables of this application.
   */
  Members: {

    /**
     * The web page sidebar name.
     */
    sidebarName: 'sidebar',

    /**
     * The webpage sidebar position.
     */
    sidebarPosition: 'right',

  },

  /**
   * The sidebar of the map.
   */
  sidebar: null,

  /**
   * The map of the application.
   */
  map: null,

  /**
   * The options used to create the map.
   */
  mapOptions: {
    //54.5
    center: [55, 31],
    zoom: 4,
    minZoom: 3,
    maxZoom: 18
  },

  /**
   * Initializes the map.
   */
  initializeMap: function() {

    spinnerViewModel.isVisible = true;

    Spatial.map = L.map('map', {
      center: Spatial.mapOptions.center,
      zoom: Spatial.mapOptions.zoom,
      minZoom: Spatial.mapOptions.minZoom,
      maxZoom: Spatial.mapOptions.maxZoom
    });

    // Move the attribution control to the bottom-left.
    Spatial.map.attributionControl.setPosition('bottomleft');

    // Create the sidebar and add it on the map.
    // TODO: RESIN
    Spatial.sidebar = L.control.sidebar(Spatial.Members.sidebarName, { position: Spatial.Members.sidebarPosition });
    Spatial.sidebar.addTo(Spatial.map);

    BaseMapLayers.setNamedBasemapLayers();
    BaseMapLayers.createBaseMapLayers();

    MapLayers.nuts3.createLayer();

    Spatial.setInitialBaseMapLayer();

    spinnerViewModel.isVisible = false;

  },

  /**
   * Sets the initial basemap layer.
   */
  setInitialBaseMapLayer: function() {

    // Get the current basemap that has been selected by the user.
    let namedBaseMap = toggleBaseMapViewModel.currentBaseMap;
    let baseLayer = BaseMapLayers.namedBasemapLayers[namedBaseMap].mapLayer;

    // Add the basemap layer in to the map.
    baseLayer.addTo(Spatial.map);
    baseLayer.bringToBack();

  }

};

// ================================================================================
//  View Models.

/**
 * The spinnerViewModel provides the data and logic to toggle the visibility of spinner.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let spinnerViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#spinnerVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * Indicates whether the spinner is visible or not.
     */
    isVisible: false

  }

});

/**
 * The sidebarTabsViewModel provides tha data and logic to toggle the sidebar itself or its contents.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let sidebarTabsViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#sidebarTabsVM',

  /**
   * The model of the view model.
   */
  data: {

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Hides the tooltip that is displayed on the specified element.
     * @param element - The element from which the tooltip will be hidden.
     */
    hideTooltip(element) {
      if (AppState.bootstrapMaterialTooltipEnabled) {
        $(element).tooltip('hide');
      }
    }

  }

});

/**
 * The toggleBaseMapViewModel provides tha data and logic to toggle the BaseMap layer.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let toggleBaseMapViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#toggleBaseMapButtonsVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * The current base map.
     */
    currentBaseMap: 'light',

    /**
     * The dictionary whose keys are the names of basemaps and items are objects providing the
     * names, icon names and descriptions of the buttons.
     * The descriptions can be used in aria-labels or as tooltips.
     */
    dictionary: {
      'light':     { name: 'Light',     iconName: 'map',            description: 'Light Basemap' },
      'dark':      { name: 'Dark',      iconName: 'map',            description: 'Dark Basemap' },
      'roads':     { name: 'Roads',     iconName: 'directions_car', description: 'Roads Basemap' },
      'physical':  { name: 'Physical',  iconName: 'panorama',       description: 'Physical Basemap' }, /* 'image, panorama, photo' */
      'terrain':   { name: 'Terrain',   iconName: 'terrain',        description: 'Terrain Basemap' },  /* 'terrain, landscape' */
      'satellite': { name: 'Satellite', iconName: 'healing',        description: 'Satellite Basemap' } /* 'satellite, cast, healing, photo_camera, local_see' */
    }

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Sets the current basemap.
     *
     * @param namedBaseMap - The named basemap.
     */
    setCurrentBaseMap(namedBaseMap) {

      // Remove the current basemap layer.
      Spatial.map.removeLayer(BaseMapLayers.namedBasemapLayers[this.currentBaseMap].mapLayer);

      this.currentBaseMap = namedBaseMap;

      if (AppState.bootstrapMaterialTooltipEnabled) {
        let element = '#' + namedBaseMap + 'Button';
        $(element).tooltip('hide');
      }

      // Add the new current basemap layer.
      let baseLayer = BaseMapLayers.namedBasemapLayers[this.currentBaseMap].mapLayer;

      baseLayer.addTo(Spatial.map);
      baseLayer.bringToBack();

      // Make sure the associated styles for MSOAs layer is applied.
      //MapLayers.MSOAs.mapLayer.options.style = MapLayers.MSOAs.namedBasemapLayers[namedBaseMap].style;
      //MapLayers.MSOAs.mapLayer.setStyle(MapLayers.MSOAs.namedBasemapLayers[namedBaseMap].style);

      //MapLayers.MSOAs.renderCommuteFlowPolygons();
      //Spatial.renderCommuteFlows();

      MapLayers.nuts3.renderLayer();

    }

  }

});




/**
 * The symbologyViewModel provides tha data and logic
 * to allow a user to setup the NUTS3 layer symbology.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let symbologyViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#symbologyVM',

  /**
   * The model of the view model.
   */
  data: {

    /**
     * Indicates whether the view is visible or not.
     */
    isVisible: true,

    /**
     * The current tab page.
     */
    currentTab: 'supergroups',

    currentDomain: 'hazard',

    /**
     * Provides a dictionary of objects to allow the rendering of the view.
     */
    dictionary: {
      'supergroups': {
        name: 'Classes',
        '1': { isInformationPanelVisible: false, icon: 'far fa-building', },
        '2': { isInformationPanelVisible: false, icon: 'fas fa-leaf' },
        '3': { isInformationPanelVisible: false, icon: 'fas fa-snowflake' },
        '4': { isInformationPanelVisible: false, icon: 'fas fa-sun' },
        '5': { isInformationPanelVisible: false, icon: 'fab fa-servicestack' },
        '6': { isInformationPanelVisible: false, icon: 'far fa-image' },
        '7': { isInformationPanelVisible: false, icon: 'fas fa-tint' },
        '8': { isInformationPanelVisible: false, icon: 'fab fa-firstdraft' }
      },
      'groups': {
        name: 'Subclasses',
        '1':  { isInformationPanelVisible: false, icon: 'far fa-building', },
        '11': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '12': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '13': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '14': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '2':  { isInformationPanelVisible: false, icon: 'fas fa-leaf' },
        '21': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '22': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '23': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '24': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '3':  { isInformationPanelVisible: false, icon: 'fas fa-snowflake' },
        '31': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '32': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '33': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '34': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '4':  { isInformationPanelVisible: false, icon: 'fas fa-sun' },
        '41': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '42': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '43': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '44': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '5':  { isInformationPanelVisible: false, icon: 'fab fa-servicestack' },
        '51': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '52': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '53': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '54': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '55': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '6':  { isInformationPanelVisible: false, icon: 'far fa-image' },
        '61': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '62': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '63': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '7':  { isInformationPanelVisible: false, icon: 'fas fa-tint' },
        '71': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '72': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '73': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '74': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '8':  { isInformationPanelVisible: false, icon: 'fab fa-firstdraft' },
        '81': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '82': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        '83': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' }
      },
      'indicators': {
        name: 'Indicators',
        'I001': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I002': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I003': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I004': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I005': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I006': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I007': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I008': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I009': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I010': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I011': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I012': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I013': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I014': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I015': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I016': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I017': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I018': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I019': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I020': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I021': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I022': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I023': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I024': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I025': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I026': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I030': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I032': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I033': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I035': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I036': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I037': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I038': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I039': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I040': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I042': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I043': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I045': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I046': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I047': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I048': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I049': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I050': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I052': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I053': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I055': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I056': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I057': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I058': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I059': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I060': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I061': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I062': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I063': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I064': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I065': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I066': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I067': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I068': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I069': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I070': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I073': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I075': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I076': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I077': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I078': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I079': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I081': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I082': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' }
      },
      'domains': ['hazard', 'exposure', 'sensitivity', 'adaptivity']
    },

    /**
     * The supergroups metadata in the form of a dictionary whose keys are the values of supergroups.
     */
    supergroups: MapLayers.nuts3.supergroups,

    /**
     * The groups metadata in the form of a dictionary whose keys are the values of groups.
     */
    groups: MapLayers.nuts3.groups,

    /**
     * The array of domain objects used to render portions of the view based on indicator domains.
     */
    domains: AppData.domains,

    /**
     * The dictionary of indicator objects used to render portions of the view based on indicators grouped per domain.
     */
    domainDictionaryIndicators: AppData.domainDictionaryIndicators,

    /**
     * The icon used on the information buttons.
     */
    infoIconName: 'help_outline', // help, help_outline, live_help, announcement, feedback, info

    /**
     * The array of selected supergroups used by the list of supergroup checkboxes.
     */
    checkedSupergroups: [ '1', '2', '3', '4', '5', '6', '7', '8' ],

    /**
     * The array of selected groups used by the list of group checkboxes.
     */
    // TODO: RESIN - Checked Groups need to be updated depending on the final typology.
    checkedGroups: [
      '11', '12', '13', '14',
      '21', '22', '23', '24',
      '31', '32', '33', '34',
      '41', '42', '43', '44',
      '51', '52', '53', '54', '55',
      '61', '62', '63',
      '71', '72', '73', '74',
      '81', '82', '83'
    ]

  },

  /**
   * The computed properties of the model of the view model.
   */
  computed: {

    /**
     * Gets the fill colors used to render the NUTS3 layer.
     * The colors are displayed on the supergroups toggle buttons.
     */
    supergroupFillColors: function() {

      let fillColors = {};

      let currentBasemap = toggleBaseMapViewModel.currentBaseMap;
      let supergroupStyles = MapLayers.nuts3.namedBasemapLayers[currentBasemap].supergroupStyles;

      for (let sg in supergroupStyles) {
        if (supergroupStyles.hasOwnProperty(sg)) {
          fillColors[sg] = {
            fillColor: supergroupStyles[sg].fillColor,
            fillOpacity: supergroupStyles[sg].fillOpacity
          };
        }
      }

      return fillColors;

    },

    /**
     * Gets the fill colors used to render the NUTS3 layer.
     * The colors are displayed on the groups toggle buttons.
     */
    groupFillColors: function() {

      let fillColors = {};

      let currentBasemap = toggleBaseMapViewModel.currentBaseMap;
      let groupStyles = MapLayers.nuts3.namedBasemapLayers[currentBasemap].groupStyles;

      for (let g in groupStyles) {
        if (groupStyles.hasOwnProperty(g)) {
          fillColors[g] = {
            fillColor: groupStyles[g].fillColor,
            fillOpacity: groupStyles[g].fillOpacity
          };
        }
      }

      return fillColors;

    }

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Sets the current tab.
     * @param tabName - The name of the tab to activate.
     */
    setCurrentTab(tabName) {
      this.currentTab = tabName;

      // TODO: RESIN - IMPORTANT REMOVE THIS IMMEDIATELY
      if (tabName !== 'indicators') {
        MapLayers.nuts3.renderLayer();
      }

    },


    setCurrentDomain(tabIndex) {
      this.currentDomain = this.dictionary.domains[tabIndex];
    },



    /**
     * Selects all the supergroups or groups depending on the currently selected tab.
     */
    selectAll() {

      if (this.currentTab === 'supergroups') {
        this.checkedSupergroups = [];

        for (let sg in this.supergroups) {
          if (this.supergroups.hasOwnProperty(sg)) {
            this.supergroups[sg].visible = true;
            this.checkedSupergroups.push(sg.toString());
          }
        }
      }
      else if (this.currentTab === 'groups') {
        this.checkedGroups = [];

        for (let g in this.groups) {
          if (this.groups.hasOwnProperty(g)) {
            this.groups[g].visible = true;
            this.checkedGroups.push(g.toString());
          }
        }
      }

      MapLayers.nuts3.renderLayer();

    },

    /**
     * Selects all the supergroups or groups depending on the currently selected tab.
     */
    deselectAll() {

      if (this.currentTab === 'supergroups') {
        for (let sg in this.supergroups) {
          if (this.supergroups.hasOwnProperty(sg)) {
            this.supergroups[sg].visible = false;
          }
        }
        this.checkedSupergroups = [];
      }
      else if (this.currentTab === 'groups') {
        for (let g in this.groups) {
          if (this.groups.hasOwnProperty(g)) {
            this.groups[g].visible = false;
          }
        }
        this.checkedGroups = [];
      }

      MapLayers.nuts3.renderLayer();

    },

    /**
     * Toggles the groups associated with the specified supergroup.
     *
     * @param supergroup - The supergroup whose associated groups will be toggled on/off.
     */
    toggleGroups(supergroup) {

      areGroupsVisible = true;

      // Loop through all the associated groups.
      let groups = this.supergroups[supergroup].groups;

      for (let i = 0; i < groups.length; i++) {
        // Check the visibility of the associated groups.
        if (this.groups[groups[i].toString()].visible) {
          // A group was found visible. Make all invisible.
          areGroupsVisible = false;
          break;
        }
      }

      // Loop through all the associated groups and set their visibility.
      for (let i = 0; i < groups.length; i++) {
        this.groups[groups[i].toString()].visible = areGroupsVisible;
      }

      // Toggle the groups associated with the specified supergroup.
      this.checkedGroups = [];

      for (let g in this.groups) {
        if (this.groups.hasOwnProperty(g)) {
          if (this.groups[g].visible) {
            this.checkedGroups.push(g.toString());
          }
        }
      }

      MapLayers.nuts3.renderLayer();

    },

    /**
     * Renders the regions of the NUTS3 layer having the specified typology class after toggling it on/off.
     *
     * @param typologyClass - The typology class that is toggled on/off.
     */
    renderNuts3TypologyClass(typologyClass) {

      this[this.currentTab][typologyClass].visible = !this[this.currentTab][typologyClass].visible;

      MapLayers.nuts3.changeTypologyClassStyle(typologyClass);

    },

    // TODO: RESIN - Remove this ???
    // /**
    //  * Renders the NUTS3 layer.
    //  */
    // renderNuts3Layer() {
    //   MapLayers.nuts3.renderLayer();
    // },

    /**
     * Toggles on/off the information panel of a supergroup, group or indicator.
     *
     * @param code - The code [ie: supergroup, group, indicator] that will be used to toggle
     *               the information of a supergroup, group or indicator.
     */
    toggleInfo(code) {
      this.dictionary[this.currentTab][code].isInformationPanelVisible =
        !this.dictionary[this.currentTab][code].isInformationPanelVisible;

      // TODO: RESIN - This code is needed if we need to show a tooltip over the help button.
      // let l = (this.currentTab === 'supergroups' ? 'sg' : (this.currentTab === 'groups' ? 'g' : 'i'));
      //
      // let element = '#toggle-' + l + '-info-' + code;
      //
      // this.destroyTooltip(element);

      // $('#' + element).tooltip();
    },

    // TODO: RESIN - Remove this???
    /**
     * Hides the tooltip that is displayed on the specified element.
     * @param element - The element from which the tooltip will be hidden.
     */
    // destroyTooltip(element) {
    //   if (AppState.bootstrapMaterialTooltipEnabled) {
    //     $(element).tooltip('hide');
    //     $(element).tooltip('dispose');
    //     $(element).tooltip();
    //   }
    // }

  }

});

/**
 * The overviewInfoViewModel provides the data and logic
 * to display overview information about a NUTS3 region.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
let overviewInfoViewModel = new Vue({

  /**
   * The name of the view model.
   */
  el: '#overviewInfoVM',

  /**
   * The model of the view model.
   */
  data: {

    isVisible: false,

    nuts3Name: '',

    nuts3NativeName: '',

    language: 'en',

    supergroupName: null,

    groupName: null,

    supergroupFillColor: { fillColor: '#ffffff', fillOpacity: 0.01 },

    groupFillColor: { fillColor: '#ffffff', fillOpacity: 0.01 },

    dictionary: {
      'indicators': {
        name: 'Indicators',
        'I001': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I002': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I003': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I004': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I005': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I006': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I007': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I008': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I009': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I010': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I011': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I012': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I013': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I014': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I015': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I016': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I017': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I018': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I019': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I020': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I021': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I022': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I023': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I024': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I025': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I026': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I030': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I032': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I033': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I035': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I036': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I037': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I038': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I039': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I040': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I042': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I043': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I045': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I046': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I047': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I048': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I049': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I050': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I052': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I053': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I055': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I056': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I057': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I058': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I059': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I060': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I061': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I062': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I063': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I064': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I065': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I066': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I067': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I068': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I069': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I070': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I073': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I075': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I076': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I077': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I078': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I079': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I081': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' },
        'I082': { isInformationPanelVisible: false, icon: 'fab fa-leanpub' }
      }
    },

    domains: AppData.domains,

    // TODO: RESIN - Remove this ???
    //domainSortedIndicators: AppData.domainSortedIndicators,

    domainDictionaryIndicators: AppData.domainDictionaryIndicators,

    domainDictionaryIndicatorValues: undefined,

    infoIconName: 'help_outline' // help, help_outline, live_help, announcement, feedback, info

  },

  /**
   * The computed properties of the model of the view model.
   */
  computed: {

  },

  /**
   * The methods of the view model.
   */
  methods: {

    /**
     * Toggles the language from en to other and vice versa.
     */
    toggleLanguage() {
      if (this.language === 'en') {
        this. language = 'other';
      }
      else {
        this.language = 'en';
      }
      if (AppState.bootstrapMaterialTooltipEnabled) {
        $('#toggle-lang').tooltip('hide');
      }
    },

    /**
     * Toggles the indicators of the specified domain.
     *
     * @param index - The index of the domain.
     */
    toggleDomain(index) {
      this.domains[index].isOverviewVisible = !this.domains[index].isOverviewVisible;
    },

    /**
     * Toggles the details view of an indicator on/off.
     *
     * @param domain - The domain in which the indicator belong to.
     * @param index - The index of the indicator in the specified domain.
     */
    toggleDetails(domain, index) {
      this.domainDictionaryIndicators[domain][index].isDetailsVisible = !this.domainDictionaryIndicators[domain][index].isDetailsVisible;
    },

    /**
     * Updates the view with the information of the selected feature.
     *
     * @param feature - The feature that will be used to retrieve the information.
     */
    updateView(feature) {

      let properties = feature.properties;

      let nuts3id = properties.NUTS_ID;
      let sg = properties.SG;
      let g = properties.G;

      this.nuts3Name = AppData.nuts3[nuts3id].nameAscii;
      this.nuts3NativeName = AppData.nuts3[nuts3id].nutsName;

      let currentLevel = symbologyViewModel.currentTab;

      if (currentLevel === 'supergroups') {
        if (MapLayers.nuts3.supergroups[sg].visible) {
          this.supergroupName = MapLayers.nuts3.supergroups[sg].name;
          this.supergroupFillColor = symbologyViewModel.supergroupFillColors[sg];
          this.groupName = MapLayers.nuts3.groups[g].name;
          this.groupFillColor = symbologyViewModel.groupFillColors[g];
        }
        else {
          this.supergroupName = null;
          this.supergroupFillColor = AppState.transparentColor;
          this.groupName = null;
          this.groupFillColor = AppState.transparentColor;
        }
      }
      else if (currentLevel === 'groups') {
        if (MapLayers.nuts3.groups[g].visible) {
          this.supergroupName = MapLayers.nuts3.supergroups[sg].name;
          this.supergroupFillColor = symbologyViewModel.supergroupFillColors[sg];
          this.groupName = MapLayers.nuts3.groups[g].name;
          this.groupFillColor = symbologyViewModel.groupFillColors[g];
        }
        else {
          this.supergroupName = null;
          this.supergroupFillColor = AppState.transparentColor;
          this.groupName = null;
          this.groupFillColor = AppState.transparentColor;
        }
      }
      else {
        this.supergroupName = MapLayers.nuts3.supergroups[sg].name;
        this.supergroupFillColor = symbologyViewModel.supergroupFillColors[sg];
        this.groupName = MapLayers.nuts3.groups[g].name;
        this.groupFillColor = symbologyViewModel.groupFillColors[g];
      }

      this.domainDictionaryIndicatorValues = {};

      for (let domain in AppData.domainDictionaryIndicators) {
        if (AppData.domainDictionaryIndicators.hasOwnProperty(domain)) {

          this.domainDictionaryIndicatorValues[domain] = [];

          for (let i = 0; i < AppData.domainDictionaryIndicators[domain].length; i++) {
            let im = AppData.domainDictionaryIndicators[domain][i];
            let value = im.type === 'double' ? properties[im.name].toFixed(3) : properties[im.name].toFixed(0); // TODO: RESIN - toFixed(0) MUST be removed once I have the correct data.

            this.domainDictionaryIndicatorValues[domain].push({
              name: im.name,
              value: value,
              unit: im.unit,
              zscore: properties[im.name + 'Z'].toFixed(3)
            })
          }

        }
      }

      // TODO: RESIN - Should this be removed?
      // Make sure that the html content of the tooltip will be displayed
      // by explicitly calling the tooltip jquery method.
      //$('[data-toggle="tooltip"]').tooltip();

    },

    /**
     * Closes the overview information panel.
     */
    close() {

      // Set the current panel.
      AppState.currentNuts3Panel = 'symbology';

      // Set the panels visibility.
      AppState.setPanelsVisibility();

      // Deselect the NUTS3 feature.
      MapLayers.nuts3.deselectNuts3();

    },

    /**
     * Toggles on/off the information panel of a supergroup, group or indicator.
     *
     * @param code - The code [ie: supergroup, group, indicator] that will be used to toggle
     *               the information of a supergroup, group or indicator.
     */
    toggleInfo(code) {
      this.dictionary.indicators[code].isInformationPanelVisible =
        !this.dictionary.indicators[code].isInformationPanelVisible;

      // TODO: RESIN - This code is needed if we need to show a tooltip over the help button.
      // let l = (this.currentTab === 'supergroups' ? 'sg' : (this.currentTab === 'groups' ? 'g' : 'i'));
      //
      // let element = '#toggle-' + l + '-info-' + code;
      //
      // this.destroyTooltip(element);

      // $('#' + element).tooltip();
    }

  }

});

/**
 * The detailsInfoViewModel provides the data and logic
 * to display detailed information about a NUTS3 region.
 *
 * @type {Vue} - A Vue object with the model and methods used in the view model.
 */
// let detailsInfoViewModel = new Vue({
//
//   /**
//    * The name of the view model.
//    */
//   el: '#detailsInfoVM',
//
//   /**
//    * The model of the view model.
//    */
//   data: {
//
//     isVisible: false,
//
//     isPinned: false
//
//   },
//
//   /**
//    * The computed properties of the model of the view model.
//    */
//   computed: {
//
//   },
//
//   /**
//    * The methods of the view model.
//    */
//   methods: {
//
//     /**
//      * Shows the details view.
//      */
//     showView() {
//
//       // Hide the Nuts3LayerSetup panel if it is visible.
//       if (toggleNuts3LayerSetupViewModel.isNuts3LayerSetupVisible) {
//         // Mark the 'layer setup' view as 'hidden while hovering'.
//         symbologyViewModel.keepHiddenWhileHovering = true;
//         toggleNuts3LayerSetupViewModel.hideNuts3LayerSetup();
//       }
//       else {
//         // Hide the overview info panel if it is visible.
//         if (overviewInfoViewModel.isVisible) {
//           overviewInfoViewModel.isVisible = false;
//         }
//       }
//
//       // Show the details info panel.
//       this.isVisible = true;
//
//     },
//
//     /**
//      * Hide the details View.
//      */
//     hideView() {
//
//       // Hide the details info panel.
//       this.isVisible = false;
//
//       // Show the 'Layer Setup' view if it is marked as 'hidden while hovering'.
//       if (symbologyViewModel.keepHiddenWhileHovering) {
//         symbologyViewModel.keepHiddenWhileHovering = false;
//         toggleNuts3LayerSetupViewModel.showNuts3LayerSetup();
//       }
//
//     },
//
//
//     updateView(feature) {
//
//
//     },
//
//
//     Pin() {
//       this.isPinned = true;
//       if (AppState.bootstrapMaterialTooltipEnabled) {
//         $('#details-pin').tooltip('show');
//       }
//     },
//
//     unPin() {
//       this.isPinned = false;
//       this.isVisible = false;
//
//       MapLayers.nuts3.deselectNuts3();
//     }
//
//
//   }
//
// });

//
// ================================================================================


// ================================================================================
//  Main Body

$(document).ready(function(){
  AppState.bootstrapMaterialTooltipEnabled = true;
  $('[data-toggle="tooltip"]').tooltip();
});

Spatial.initializeMap();

Spatial.sidebar.open('map-controls');

//
// ================================================================================
