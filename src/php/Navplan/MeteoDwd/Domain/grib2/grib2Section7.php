<?php
require_once "grib2Base.php";


// Data Section
class Grib2Section7 extends Grib2SectionVariableLength {
    public $sectionNumber;
    public $dataValueList = [];
    public $dataValueNum = 0;
    private $dataRepresentationTemplateNumber;
    private $dataRepresentationTemplate;
    private $gridDefinitionTemplateNumber;
    private $gridDefinitionTemplate;
    private $im;
    private $imIterator;
    private $imgFilename;


    public function __construct(
        $fileHandle,
        $dataRepresentationTemplateNumber,
        $dataRepresentationTemplate,
        $gridDefinitionTemplateNumber,
        $gridDefinitionTemplate,
        $imgFilename) {

        $this->dataRepresentationTemplateNumber = $dataRepresentationTemplateNumber;
        $this->dataRepresentationTemplate = $dataRepresentationTemplate;
        $this->gridDefinitionTemplateNumber = $gridDefinitionTemplateNumber;
        $this->gridDefinitionTemplate = $gridDefinitionTemplate;
        $this->imgFilename = $imgFilename;
        parent::__construct($fileHandle);
    }


    protected function parse($content) {
        $byteArray = unpack("C1a", $content);
        $this->sectionNumber = $byteArray["a"];

        $format = "C1a";
        $numBits = $this->dataRepresentationTemplate->getNumberOfBits();
        switch ($numBits) {
            case 8: $format .= "/C*b"; break;
            case 16: $format .= "/n*b"; break;
            case 32: $format .= "/N*b"; break;
        }

        $byteArray = unpack($format, $content);
        $this->sectionNumber = $byteArray["a"];

        if (!$this->imgFilename)
            return;

        // create image from data
        $numColumns = $this->gridDefinitionTemplate->getNumColumns();
        $numRows = $this->gridDefinitionTemplate->getNumRows();
        $this->createImage($numColumns, $numRows);

        $rowValues = [];
        foreach ($byteArray as $key => $value) {
            if ($key === "a")
                continue;

            $this->dataValueNum++;
            $rowValues[] = $this->dataRepresentationTemplate->decodeOriginalValue($value);

            if (count($rowValues) >= $numColumns) {
                $this->drawNextPixelLine($rowValues, $numRows);
                $rowValues = [];
            }
        }

        if ($this->dataValueNum > 0)
            $this->writeImage();
    }


    public function getDescription() {
        return array (
            "Section" => $this->sectionNumber . " (Data Section)",
            "Number of data values" => $this->dataValueNum,
            "Image" => $this->dataValueNum > 0 ? "<img src='" . $this->imgFilename . "'>" : "-"
        );
    }


    private function createImage($numColumns, $numRows) {
        $this->im = new Imagick();
        $this->im->newImage($numColumns, $numRows, new ImagickPixel('transparent'));
        $this->im->setImageFormat("png");
        $this->imIterator = $this->im->getPixelIterator();
    }


    private function drawNextPixelLine($values, $numRows) {
        $currentRow = $this->imIterator->getIteratorRow();
        $pixels = $this->imIterator->getCurrentIteratorRow();

        $i = 0;
        foreach ($pixels as $column => $pixel) {
            $color = intval($values[$i] / 100 * 255);
            $alpha = round($values[$i] / 100.0, 1);
            $pixel->setColor("rgba(" . $color . "," . $color . "," . $color . ", 1.0)");
            //$pixel->setColor("rgba(255, 0, 0, " . $alpha . ")");
            $i++;
        }

        if ($currentRow < $numRows - 1)
            $this->imIterator->setIteratorRow($currentRow + 1);

        $this->imIterator->syncIterator();
    }


    private function writeImage() {
        $scanningMode = $this->gridDefinitionTemplate->getScanningMode();
        if ($scanningMode->hasJDirectionPositive())
            $this->im->flipImage();

        if (!$scanningMode->hasIDirectionPositive())
            $this->im->flopImage();

        $this->im->writeImage("png8:" . $this->imgFilename);
    }
}
