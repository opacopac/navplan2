<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Model;


class RawNotam
{
    public function __construct(
        public readonly int $id,
        public readonly string $notamId, // ID of the NOTAM
        public readonly string $country, // ISO 3-Letter code of the State
        public readonly string $type, // Location type, either airspace or airport
        public readonly string $icao, // ICAO code of the location the NOTAM applies to
        public readonly string $notam, // full NOTAM message
        public ?array $geometry = null, // temporary field for processing
        public ?string $dbExtent = null, // temporary field for processing
        public ?array $airspaceGeometry = null, // temporary field for processing
        public ?array $polyzoomlevels = null, // temporary field for processing
        public ?array $multipolyzoomlevels = null // temporary field for processing
    )
    {
    }
}
