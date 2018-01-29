<?php


abstract class Grib2Section {
    public function __construct($fileHandle) {
        $content = $this->read($fileHandle);
        $this->parse($content);
    }


    protected abstract function read($fileHandle);


    protected abstract function parse($fileHandle);


    public abstract function getDescription();
}


abstract class Grib2SectionFixedLength extends Grib2Section {
    protected function read($fileHandle) {
        return fread($fileHandle, $this->getLength());
    }


    protected abstract function getLength();
}


abstract class Grib2SectionVariableLength extends Grib2Section {
    public $length;


    protected function read($fileHandle) {
        $lenStr = fread($fileHandle, 4);
        $this->length = unpack("N1a", $lenStr)["a"];
        return fread($fileHandle, $this->length - 4);
    }
}


abstract class Grib2Template {
    public function __construct($content) {
        $this->parse($content);
    }


    protected abstract function parse($content);


    public abstract function getDescription();
}


abstract class Grib2GridDefinitionTemplate extends Grib2Template {
    public abstract function getNumColumns();

    public abstract function getNumRows();

    public abstract function getScanningMode();
}


abstract class Grib2DataRepresentationTemplate extends Grib2Template {
    public abstract function getNumberOfBits();


    public abstract function decodeOriginalValue($packedValue);
}


abstract class Grib2Table {
    public $value;


    public function __construct($value) {
        $this->value = $value;
    }


    public abstract function getDescription();
}


abstract class Grib2Flags {
    public $flags;


    public function __construct($flags) {
        $this->flags = $flags;
    }


    public abstract function getDescription();
}
