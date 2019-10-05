<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain;

use http\Exception\InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section0\IndicatorSection;
use Navplan\MeteoGrib2\Domain\Section1\IdentificationSection;
use Navplan\MeteoGrib2\Domain\Section2\LocalUseSection;
use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionSection;
use Navplan\MeteoGrib2\Domain\Section4\ProductDefinitionSection;
use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationSection;
use Navplan\MeteoGrib2\Domain\Section6\BitmapSection;
use Navplan\MeteoGrib2\Domain\Section7\DataSection;
use Navplan\MeteoGrib2\Domain\Section8\EndSection;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/
class Grib2Message {
    private $indicatorSection = NULL;
    private $identificationSection = NULL;
    private $localUseSectionList = [];
    private $gridDefinitionSectionList = [];
    private $productDefinitionSectionList = [];
    private $dataRepresentationSectionList = [];
    private $bitmapSectionList = [];
    private $dataSectionList = [];
    private $endSection = NULL;


    // region GETTER

    public function getIndicatorSection(): ?IndicatorSection {
        return $this->indicatorSection;
    }


    public function getIdentificationSection(): ?IdentificationSection {
        return $this->identificationSection;
    }


    public function getLocalUseSectionList(): array {
        return $this->localUseSectionList;
    }


    public function getGridDefinitionSectionList(): array {
        return $this->gridDefinitionSectionList;
    }


    public function getProductDefinitionSectionList(): array {
        return $this->productDefinitionSectionList;
    }


    public function getDataRepresentationSectionList(): array {
        return $this->dataRepresentationSectionList;
    }


    public function getBitmapSectionList(): array {
        return $this->bitmapSectionList;
    }


    public function getDataSectionList(): array {
        return $this->dataSectionList;
    }


    public function getEndSection(): ?EndSection {
        return $this->endSection;
    }

    // endregion


    public function __construct() {
    }


    public function addIndicatorSection(IndicatorSection $section0): void {
        if ($this->indicatorSection !== NULL) {
            throw new InvalidArgumentException('indicator section must only be added once');
        }

        $this->indicatorSection = $section0;
    }


    public function addIdentificationSection(IdentificationSection $section1): void {
        if ($this->identificationSection !== NULL) {
            throw new InvalidArgumentException('identification section must only be added once');
        }

        $this->identificationSection = $section1;
    }


    public function addLocalUseSection(LocalUseSection $section2): void {
        $this->localUseSectionList[] = $section2;
    }


    public function addGridDefinitionSection(GridDefinitionSection $section3): void {
        $this->gridDefinitionSectionList[] = $section3;
    }


    public function addProductDefinitionSection(ProductDefinitionSection $section4): void {
        $this->productDefinitionSectionList[] = $section4;
    }


    public function addDataRepresentationSection(DataRepresentationSection $section5): void {
        $this->dataRepresentationSectionList[] = $section5;
    }


    public function addBitmapSection(BitmapSection $section6): void {
        $this->bitmapSectionList[] = $section6;
    }


    public function addDataSection(DataSection $section7): void {
        $this->dataSectionList[] = $section7;
    }


    public function addEndSection(EndSection $section8): void {
        if ($this->endSection !== NULL) {
            throw new InvalidArgumentException('end section must only be added once');
        }

        $this->endSection = $section8;
    }
}
