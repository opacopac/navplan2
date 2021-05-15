<?php
require_once "grib2Base.php";


// Identification Section
class Grib2Section1 extends Grib2SectionVariableLength {
    public $sectionNumber;
    public $originCenter;
    public $originSubcenter;
    public $gribMasterTableVersion;
    public $gribLocalTableVersion;
    public $significanceReferenceTime;
    public $year;
    public $month;
    public $day;
    public $hour;
    public $minute;
    public $second;
    public $productionStatus;
    public $processedDataType;


    protected function parse($content) {
        $byteArray = unpack("C1a/n1b/n1c/C1d/C1e/C1f/n1g/C1h/C1i/C1j/C1k/C1l/C1m/C1n", $content);
        $this->sectionNumber = $byteArray["a"];
        $this->originCenter = new Grib2Table0($byteArray["b"]);
        $this->originSubcenter = new Grib2TableC($byteArray["c"]);
        $this->gribMasterTableVersion = new Grib2Table1_0($byteArray["d"]);
        $this->gribLocalTableVersion = new Grib2Table1_1($byteArray["e"]);
        $this->significanceReferenceTime = new Grib2Table1_2($byteArray["f"]);
        $this->year = $byteArray["g"];
        $this->month = $byteArray["h"];
        $this->day = $byteArray["i"];
        $this->hour = $byteArray["j"];
        $this->minute = $byteArray["k"];
        $this->second = $byteArray["l"];
        $this->productionStatus = new Grib2Table1_3($byteArray["m"]);
        $this->processedDataType = new Grib2Table1_4($byteArray["n"]);
    }


    public function getDescription() {
        return array (
            "Section" => "1 (Identification Section)",
            "Originating Center / Sub-Center" => $this->originCenter->getDescription() . " / " . $this->originSubcenter->getDescription(),
            "GRIB Master / Local Table Version" => $this->gribMasterTableVersion->getDescription() . " / " . $this->gribLocalTableVersion->value . ": " . $this->gribLocalTableVersion->getDescription(),
            "Significance of reference time" => $this->significanceReferenceTime->value . ": " . $this->significanceReferenceTime->getDescription(),
            "Date / Time" => $this->year . "-" . $this->month . "-" . $this->day . " " . $this->hour . ":" . $this->minute . ":" . $this->second,
            "Production Status" => $this->productionStatus->value . ": " . $this->productionStatus->getDescription(),
            "Data Type" => $this->processedDataType->value . ": " . $this->processedDataType->getDescription()
        );
    }
}


// ON388 - TABLE 0
// NATIONAL/INTERNATIONAL ORIGINATING CENTERS (Assigned By The WMO)
class Grib2Table0 extends Grib2Table {
    public function getDescription() {
        return $this->value; // TODO
    }
}


// ON388 - TABLE C
// NATIONAL SUB-CENTERS (Assigned By The Nation)
class Grib2TableC extends Grib2Table {
    public function getDescription() {
        return $this->value; // TODO
    }
}


// GRIB2 - TABLE 1.0
// GRIB Master Tables Version Number
class Grib2Table1_0 extends Grib2Table {
    public function getDescription() {
        return $this->value; // TODO
    }
}


// GRIB2 - TABLE 1.1
// GRIB Local Tables Version Number
class Grib2Table1_1 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Local tables not used.  Only table entries and templates from the current master table are valid.";
            case 255: return "Missing";
            default: return "Number of local table version used";
        }
    }
}


// GRIB2 - TABLE 1.2
// Significance of Reference Time
class Grib2Table1_2 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Analysis";
            case 1: return "Start of Forecast";
            case 2: return "Verifying Time of Forecast";
            case 3: return "Observation Time";
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}


// GRIB2 - TABLE 1.3
// Production Status of Data
class Grib2Table1_3 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Operational Products";
            case 1: return "Operational Test Products";
            case 2: return "Research Products";
            case 3: return "Re-Analysis Products";
            case 4: return "THORPEX Interactive Grand Global Ensemble (TIGGE)";
            case 5: return "THORPEX Interactive Grand Global Ensemble (TIGGE) test";
            case 6: return "S2S Operational Products";
            case 7: return "S2S Test Products";
            case 8: return "Uncertainties in ensembles of regional reanalysis project (UERRA)";
            case 9: return "Uncertainties in ensembles of regional reanalysis project (UERRA) Test";
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}



// GRIB2 - TABLE 1.4
// TYPE OF DATA
class Grib2Table1_4 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Analysis Products";
            case 1: return "Forecast Products";
            case 2: return "Analysis and Forecast Products";
            case 3: return "Control Forecast Products";
            case 4: return "Perturbed Forecast Products";
            case 5: return "Control and Perturbed Forecast Products";
            case 6: return "Processed Satellite Observations";
            case 7: return "Processed Radar Observations";
            case 8: return "Event Probability";
            case 192: return "Experimental Products";
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}
