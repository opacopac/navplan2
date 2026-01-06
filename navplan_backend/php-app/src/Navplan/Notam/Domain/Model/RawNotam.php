<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Model;


class RawNotam
{
    /**
     * @param int $id
     * @param string $notamId
     * @param string $country
     * @param string $type
     * @param string $icao
     * @param string $notam
     * @param RawNotamGeometry|null $geometry
     * @param string|null $dbExtent
     * @param RawNotamGeometry[]|null $airspaceGeometry
     * @param array|null $polyzoomlevels
     * @param array|null $multipolyzoomlevels
     */
    public function __construct(
        public readonly int $id,
        public readonly string $notamId, // ID of the NOTAM
        public readonly string $country, // ISO 3-Letter code of the State
        public readonly string $type, // Location type, either airspace or airport
        public readonly string $icao, // ICAO code of the location the NOTAM applies to
        public readonly string $notam, // full NOTAM message
        public ?RawNotamGeometry $geometry = null, // temporary field for processing
        public ?string $dbExtent = null, // temporary field for processing
        public ?array $airspaceGeometry = null, // temporary field for processing
        public ?array $polyzoomlevels = null, // temporary field for processing
        public ?array $multipolyzoomlevels = null // temporary field for processing
    )
    {
    }
}
