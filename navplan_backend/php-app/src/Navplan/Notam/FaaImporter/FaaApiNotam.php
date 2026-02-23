<?php declare(strict_types=1);

namespace Navplan\Notam\FaaImporter;


use Navplan\Common\StringNumberHelper;


class FaaApiNotam
{
    public function __construct(
        public ?string $series,
        public ?string $number,
        public ?string $year,
        public ?string $simpleText,
        public ?string $selectionCode,
        public ?string $affectedFIR,
        public ?string $icaoLocation,
        public string $location,
        public ?string $issued,
        public string $effectiveStart,
        public string $effectiveEnd,
        public ?string $text,
        public ?string $fullText,
        public bool $isIcao,
    ) {
    }


    /**
     * Get a string representation of the NOTAM identifier
     * Handles both ICAO format (with series) and LOCAL_FORMAT (without series)
     */
    public function getIdentifier(): string
    {
        // If series is present, it's an ICAO format NOTAM (e.g., "A1811/25")
        if ($this->series !== null && $this->number !== null && $this->year !== null) {
            return sprintf("%s%04d/%s", $this->series, $this->number, substr($this->year, -2));
        }

        // If no series but we have simpleText, try to extract from LOCAL_FORMAT
        if ($this->simpleText !== null) {
            // Extract identifier from simpleText format: "!CNM 12/017 ..."
            if (preg_match('/^(!?[A-Z0-9]+\s+\d+\/\d+)/', $this->simpleText, $matches)) {
                return $matches[1];
            }
        }

        return '';
    }
}
