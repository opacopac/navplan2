<?php
require_once "grib2Base.php";


// Product Definition Section
class Grib2Section4 extends Grib2SectionVariableLength {
    public $sectionNumber;
    public $coordValueNumber;
    public $prodDefTemplateNumber;
    public $prodDefTemplate;
    private $discipline;


    public function __construct($fileHandle, $discipline) {
        $this->discipline = $discipline;
        parent::__construct($fileHandle);
    }


    protected function parse($content) {
        $byteArray = unpack("C1a/n1b/n1c/a*d", $content); // TODO: abh. von coordValueNumber
        $this->sectionNumber = $byteArray["a"];
        $this->coordValueNumber = $byteArray["b"];
        $this->prodDefTemplateNumber = new Grib2Table4_0($byteArray["c"]);

        switch ($this->prodDefTemplateNumber->value) {
            case 0:
                $this->prodDefTemplate = new Grib2Template4_0($byteArray["d"], $this->discipline->value);
                break;
        }
    }


    public function getDescription() {
        return array (
            "Section" => $this->sectionNumber . " (Product Definition Section)",
            "Coordinate Values" => $this->coordValueNumber,
            "Product definition template number" => $this->prodDefTemplateNumber->value . ": " . $this->prodDefTemplateNumber->getDescription(),
            "Product definition template" => $this->prodDefTemplate->getDescription()
        );
    }
}


// PRODUCT DEFINITION TEMPLATE 4.0
// Analysis or forecast at a horizontal level or in a horizontal layer at a point in time
class Grib2Template4_0 extends Grib2Template {
    public $paramCategory;
    public $paramNumber;
    public $generatingProcessType;
    public $bgGenProcIdentifier;
    public $generatingProcess;
    public $hoursCutOff;
    public $minutesCutOff;
    public $timeRangeUnit;
    public $forecastTime;
    public $firstFixedSurfaceType;
    public $firstFixedSurfaceScaleFactor;
    public $firstFixedSurfaceScaleValue;
    public $secondFixedSurfaceType;
    public $secondFixedSurfaceScaleFactor;
    public $secondFixedSurfaceScaleValue;
    private $discipline;


    public function __construct($content, $discipline) {
        $this->discipline = $discipline;
        parent::__construct($content);
    }


    protected function parse($content) {
        $byteArray = unpack("C1a/C1b/C1c/C1d/C1e/n1f/C1g/C1h/N1i/C1j/C1k/N1l/C1m/C1n/N1o", $content);
        $this->paramCategory = new Grib2Table4_1($byteArray["a"], $this->discipline);
        $this->paramNumber = new Grib2Table4_2($byteArray["b"], $this->discipline, $this->paramCategory->value);
        $this->generatingProcessType = new Grib2Table4_3($byteArray["c"]);
        $this->bgGenProcIdentifier = $byteArray["d"];
        $this->generatingProcess = $byteArray["e"]; // TODO
        $this->hoursCutOff = $byteArray["f"];
        $this->minutesCutOff = $byteArray["g"];
        $this->timeRangeUnit = new Grib2Table4_4($byteArray["h"]);
        $this->forecastTime = $byteArray["i"];
        $this->firstFixedSurfaceType = new Grib2Table4_5($byteArray["j"]);
        $this->firstFixedSurfaceScaleFactor = $byteArray["k"];
        $this->firstFixedSurfaceScaleValue = $byteArray["l"];
        $this->secondFixedSurfaceType = new Grib2Table4_5($byteArray["m"]);
        $this->secondFixedSurfaceScaleFactor = $byteArray["n"];
        $this->secondFixedSurfaceScaleValue = $byteArray["o"];
    }


    public function getDescription() {
        return array(
            "Parameter category" => $this->paramCategory->value . ": " . $this->paramCategory->getDescription(),
            "Parameter number" => $this->paramNumber->value . ": " . $this->paramNumber->getDescription(),
            "Generating process type" => $this->generatingProcessType->value . ": " . $this->generatingProcessType->getDescription(),
            "Process identifier" => $this->bgGenProcIdentifier,
            "Generating process" => $this->generatingProcess,
            "Hours / Minutes cutoff" =>  $this->hoursCutOff . "/" . $this->minutesCutOff,
            "Forecast time" => $this->forecastTime . " " . $this->timeRangeUnit->getDescription(),
            "First fixed surface type" => $this->firstFixedSurfaceType->value . ": " . $this->firstFixedSurfaceType->getDescription(),
            "First fixed surface scale factor / value" => $this->firstFixedSurfaceScaleFactor . "/" . $this->firstFixedSurfaceScaleValue,
            "Second fixed surface type" => $this->secondFixedSurfaceType->value . ": " . $this->secondFixedSurfaceType->getDescription(),
            "Second fixed surface scale factor / value" => $this->secondFixedSurfaceScaleFactor . "/" . $this->secondFixedSurfaceScaleValue,
        );
    }
}


// GRIB2 - CODE TABLE 4.0
// PRODUCT DEFINITION TEMPLATE NUMBER
class Grib2Table4_0 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Analysis or forecast at a horizontal level or in a horizontal layer at a point in time.  (see Template 4.0)";
            case 65535: return "Missing";
        }

        if ($this->value >= 32768 && $this->value <= 65534)
            return "Reserved for Local Use";
        else
            return "ERROR: Not Implemented"; // TODO
    }
}


// GRIB2 - CODE TABLE 4.1
// PARAMETER CATEGORY BY PRODUCT DISCIPLINE
class Grib2Table4_1 extends Grib2Table {
    private $discipline;


    public function __construct($value, $discipline) {
        $this->discipline = $discipline;
        parent::__construct($value);
    }


    public function getDescription() {
        switch ($this->discipline) {
            case 0: // Product Discipline 0 - Meteorological Products
                switch ($this->value) {
                    case 0: return "Temperature (see Table 4.2-0-0)";
                    case 1: return "Moisture (see Table 4.2-0-1)";
                    case 2: return "Momentum (see Table 4.2-0-2)";
                    case 3: return "Mass (see Table 4.2-0-3)";
                    case 4: return "Short-wave radiation (see Table 4.2-0-4)";
                    case 5: return "Long-wave radiation (see Table 4.2-0-5)";
                    case 6: return "Cloud (see Table 4.2-0-6)";
                    case 7: return "Thermodynamic Stability indicies (see Table 4.2-0-7)";
                    case 8: return "Kinematic Stability indicies ";
                    case 9: return "Temperature Probabilities";
                    case 10: return "Moisture Probabilities";
                    case 11: return "Momentum Probabilities";
                    case 12: return "Mass Probabilities";
                    case 13: return "Aerosols (see Table 4.2-0-13)";
                    case 14: return "Trace gases (e.g. Ozone, CO2) (see Table 4.2-0-14)";
                    case 15: return "Radar (see Table 4.2-0-15)";
                    case 16: return "Forecast Radar Imagery (see Table 4.2-0-16)";
                    case 17: return "Electrodynamics (see Table 4.2-0-17)";
                    case 18: return "Nuclear/radiology (see Table 4.2-0-18)";
                    case 19: return "Physical atmospheric properties (see Table 4.2-0-19)";
                    case 20: return "Atmospheric chemical Constituents (see Table 4.2-0-20)";
                    case 190: return "CCITT IA5 string (see Table 4.2-0-190)";
                    case 191: return "Miscellaneous (see Table 4.2-0-191)";
                    case 192: return "Covariance (see Table 4.2-0-192)";
                    case 255: return "Missing";
                }

                if ($this->value >= 192 && $this->value <= 254)
                    return "Reserved for Local Use";
                else
                    return "Reserved";

                break;
            default: return "ERROR: Not Implemented1"; // TODO
        }
    }
}


// GRIB2 - CODE TABLE 4.2
// PARAMETER NUMBER BY PRODUCT DISCIPLINE AND PARAMETER CATEGORY
class Grib2Table4_2 extends Grib2Table {
    private $discipline;
    private $parameterCategory;
    public $parameter;


    public function __construct($value, $discipline, $parameterCategory) {
        $this->discipline = $discipline;
        $this->parameterCategory = $parameterCategory;
        parent::__construct($value);

        switch ($this->discipline) {
            case 0: // Product Discipline 0 - Meteorological Products
                switch ($this->parameterCategory) {
                    case 0 : // Temperature
                        $this->parameter = new Grib2Table4_2_0_0($value);
                        break;
                    case 6 : // Temperature
                        $this->parameter = new Grib2Table4_2_0_6($value);
                        break;
                    // TODO
                }

                break;
            // TODO
        }
    }


    public function getDescription() {
        if ($this->parameter)
            return $this->parameter->getDescription();
        else
            return "ERROR: Not Implemented2"; // TODO
    }
}


// GRIB2 - TABLE 4.2-0-0
// PARAMETERS FOR DISCIPLINE 0 CATEGORY 0 (Meteorological products, Temperature category)
class Grib2Table4_2_0_0 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Temperature [K]";
            case 2: return "Virtual Temperature [K]";
            case 3: return "Potential Temperature [K]";
            // TODO
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}


// GRIB2 - TABLE 4.2-0-6
// PARAMETERS FOR DISCIPLINE 0 CATEGORY 6 (Meteorological products, Cloud category)
class Grib2Table4_2_0_6 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Cloud Ice [kg m-2]";
            case 1: return "Total Cloud Cover [%]";
            case 2: return "Convective Cloud Cover [%]";
            case 3: return "Low Cloud Cover [%]";
            case 4: return "Medium Cloud Cover [%]";
            case 5: return "High Cloud Cover [%]";
            case 6: return "Cloud Water [kg m-2]";
            case 7: return "Cloud Amount [%]";
            case 8: return "Cloud Type (See Table 4.203)";
            case 9: return "Thunderstorm Maximum Tops [m]";
            case 10: return "Thunderstorm Coverage (See Table 4.204)";
            case 11: return "Cloud Base [m]";
            case 12: return "Cloud Top [m]";
            case 13: return "Ceiling [m]";
            case 14: return "Non-Convective Cloud Cover [%]";
            case 15: return "Cloud Work Function [J kg-1]";
            case 16: return "Convective Cloud Efficiency (Proportion)";
            case 17: return "Total Condensate [kg kg-1]";
            case 18: return "Total Column-Integrated Cloud Water [kg m-2]";
            case 19: return "Total Column-Integrated Cloud Ice [kg m-2]";
            case 20: return "Total Column-Integrated Condensate [kg m-2]";
            case 21: return "Ice fraction of total condensate (Proportion)";
            case 22: return "Cloud Cover [%]";
            case 23: return "Cloud Ice Mixing Ratio [kg kg-1]";
            case 24: return "Sunshine (Numeric)";
            // TODO
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}


// GRIB2 - CODE TABLE 4.3
// TYPE OF GENERATING PROCESS
class Grib2Table4_3 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Analysis";
            case 1: return "Initialization";
            case 2: return "Forecast";
            case 3: return "Bias Corrected Forecast";
            case 4: return "Ensemble Forecast";
            case 5: return "Probability Forecast";
            case 6: return "Forecast Error";
            case 7: return "Analysis Error";
            case 8: return "Observation";
            case 9: return "Climatological";
            case 10: return "Probability-Weighted Forecast";
            case 11: return "Bias-Corrected Ensemble Forecast";
            case 12: return "Post-processed Analysis";
            case 13: return "Post-processed Forecast";
            case 14: return "Nowcast";
            case 15: return "Hindcast";
            case 16: return "Physical Retrieval";
            case 17: return "Regression Analysis";
            case 18: return "Difference Between Two Forecasts";
            case 192: return "Forecast Confidence Indicator";
            case 193: return "Probability-matched Mean";
            case 194: return "Forecast Confidence Indicator";
            case 195: return "Bias-Corrected and Downscaled Ensemble Forecast";
            case 196: return "Perturbed Analysis for Ensemble Initialization";
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}


// GRIB2 - CODE TABLE 4.4
// INDICATOR OF UNIT OF TIME RANGE
class Grib2Table4_4 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Minute";
            case 1: return "Hour";
            case 2: return "Day";
            case 3: return "Month";
            case 4: return "Year";
            case 5: return "Decade (10 Years)";
            case 6: return "Normal (30 Years)";
            case 7: return "Century (100 Years)";
            case 10: return "3 Hours";
            case 11: return "6 Hours";
            case 12: return "12 Hours";
            case 13: return "Second";
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}


// GRIB2 - CODE TABLE 4.5
// FIXED SURFACE TYPES AND UNITS
class Grib2Table4_5 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 1: return "Ground or Water Surface";
            case 2: return "Cloud Base Level";
            case 3: return "Level of Cloud Tops";
            case 4: return "Level of 0° C Isotherm";
            case 5: return "Level of Adiabatic Condensation Lifted from the Surface";
            case 6: return "Maximum Wind Level";
            case 7: return "Tropopause";
            case 8: return "Nominal Top of the Atmosphere";
            case 9: return "Sea Bottom";
            case 10: return "Entire Atmosphere";
            case 11: return "Cumulonimbus Base (CB) [m]";
            case 12: return "Cumulonimbus Top (CT) [m]";
            case 13: return "Lowest level where vertically integrated cloud cover exceeds the specified percentage (cloud base for a given percentage cloud cover) [%]";
            case 14: return "Level of free convection (LFC)";
            case 15: return "Convection condensation level (CCL)";
            case 16: return "Level of neutral buoyancy or equilibrium (LNB)";
            case 20: return "Isothermal Level [K]";
            case 21: return "Lowest level where mass density exceeds the specified value (base for a given threshold of mass density) [kg m-3]";
            case 22: return "Highest level where mass density exceeds the specified value (top for a given threshold of mass density) [kg m-3]";
            case 23: return "Lowest level where air concentration exceeds the specified value (base for a given threshold of air concentration) [Bq m-3]";
            case 24: return "Highest level where air concentration exceeds the specified value (top for a given threshold of air concentration) [Bq m-3]";
            case 100: return "Isobaric Surface [Pa]";
            case 101: return "Mean Sea Level";
            case 102: return "Specific Altitude Above Mean Sea Level [m]";
            case 103: return "Specified Height Level Above Ground [m]";
            case 104: return "Sigma Level";
            case 105: return "Hybrid Level";
            // TODO
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}
