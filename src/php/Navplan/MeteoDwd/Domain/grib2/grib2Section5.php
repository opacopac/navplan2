<?php
require_once "grib2Base.php";


// Data Representation Section
class Grib2Section5 extends Grib2SectionVariableLength {
    public $sectionNumber;
    public $dataPointNumber;
    public $dataRepTemplateNumber;
    public $dataRepTemplate;


    protected function parse($content) {
        $byteArray = unpack("C1a/N1b/n1c/a*d", $content);
        $this->sectionNumber = $byteArray["a"];
        $this->dataPointNumber = $byteArray["b"];
        $this->dataRepTemplateNumber = new Grib2Table5_0($byteArray["c"]);
        switch ($this->dataRepTemplateNumber->value) {
            case 0:
                $this->dataRepTemplate = new Grib2Template5_0($byteArray["d"]);
                break;
            // TODO
        }
    }


    public function getDescription() {
        return array (
            "Section" => $this->sectionNumber . " (Data Representation Section)",
            "Data points" => $this->dataPointNumber,
            "Data representation template number" => $this->dataRepTemplateNumber->value . ": " . $this->dataRepTemplateNumber->getDescription(),
            "Data representation template" => $this->dataRepTemplate->getDescription()
        );
    }
}


class Grib2Template5_0 extends Grib2DataRepresentationTemplate {
    public $referenceValue;
    public $binScaleFactor;
    public $decScaleFactor;
    public $numBits;
    public $originalFieldType;

    protected function parse($content) {
        $byteArray = unpack("N1a/n1b/n1c/C1d/C1e", $content);
        $this->referenceValue = $this->convertSingleToFloat($byteArray["a"]);
        $this->binScaleFactor = $this->convertShortToSigned($byteArray["b"]);
        $this->decScaleFactor = $this->convertShortToSigned($byteArray["c"]);
        $this->numBits = $byteArray["d"];
        $this->originalFieldType = new Grib2Table5_1($byteArray["e"]);
    }

    public function getDescription() {
        return array(
            "Reference value" => $this->referenceValue,
            "Binary scale factor" => $this->binScaleFactor,
            "Decimal scale factor" => $this->decScaleFactor,
            "Number of bits" => $this->numBits,
            "Original field type" => $this->originalFieldType->value . ": " . $this->originalFieldType->getDescription()
        );
    }


    public function getNumberOfBits() {
        return $this->numBits;
    }


    public function decodeOriginalValue($packedValue) {
        // Y = (R + X * 2^E) / 10^D
        $origValue = ($this->referenceValue + $packedValue * 1.0 * pow(2, $this->binScaleFactor)) / pow(10, $this->decScaleFactor);

        if ($this->originalFieldType->value == 1)
            return intval($origValue);
        else
            return $origValue;
    }


    private function convertShortToSigned($unsignedShort) {
        if ($unsignedShort >= pow(2, 15))
            return -$unsignedShort + pow(2, 15);
        else
            return $unsignedShort;
    }


    private function convertSingleToFloat($unsignedSingle) {
        //               |2345678|2345678|2345678|2345678
        $signBitmask = 0b10000000000000000000000000000000;
        $expBitmask =  0b01111111100000000000000000000000;
        $fracBitmask = 0b00000000011111111111111111111111;

        $s = ($unsignedSingle & $signBitmask) >> 31;
        $x = ($unsignedSingle & $expBitmask) >> 23;
        $m = ($unsignedSingle & $fracBitmask);

        return pow(-1, $s) * (1 + $m * pow(2, -23)) * pow(2, $x - 127);
    }
}


// GRIB2 - TABLE 5.0
// DATA REPRESENTATION TEMPLATE NUMBER
class Grib2Table5_0 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Grid Point Data - Simple Packing (see Template 5.0)";
            case 1: return "Matrix Value at Grid Point - Simple Packing (see Template 5.1)";
            case 2: return "Grid Point Data - Complex Packing (see Template 5.2)";
            case 3: return "Grid Point Data - Complex Packing and Spatial Differencing (see Template 5.3)";
            case 4: return "Grid Point Data - IEEE Floating Point Data (see Template 5.4)";
            case 40: return "Grid Point Data - JPEG2000 Compression (see Template 5.40)";
            case 41: return "Grid Point Data - PNG Compression (see Template 5.41)";
            case 50: return "Spectral Data - Simple Packing (see Template 5.50) ";
            case 51: return "Spectral Data - Complex Packing (see Template 5.51)";
            case 61: return "Grid Point Data - Simple Packing With Logarithm Pre-processing (see Template 5.61)";
            case 200: return "Run Length Packing With Level Values (see Template 5.200)";
            case 65535: return "Missing";
        }

        if ($this->value >= 49152 && $this->value <= 65534)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}


// GRIB2 - TABLE 5.1
// TYPE OF ORIGINAL FIELD VALUES
class Grib2Table5_1 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Floating Point";
            case 1: return "Integer";
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}
