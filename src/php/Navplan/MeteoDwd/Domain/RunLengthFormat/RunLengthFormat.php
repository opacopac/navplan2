<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\RunLengthFormat;


// https://www.dwd.de/DE/leistungen/radarprodukte/formatbeschreibung_fxdaten.pdf?__blob=publicationFile&v=2
// https://www.dwd.de/DE/leistungen/radolan/radolan_info/radolan_radvor_op_komposit_format_pdf.pdf?__blob=publicationFile&v=12
class RunLengthFormat {
    private $header;
    private $values;


    // region GETTER

    public function getHeader(): RunLengthFormatHeader {
        return $this->header;
    }


    public function getValues(): RunLengthFormatValues {
        return $this->values;
    }

    // endregion


    public function __construct(
        RunLengthFormatHeader $header,
        RunLengthFormatValues $values
    ) {
        $this->header = $header;
        $this->values = $values;
    }
}
