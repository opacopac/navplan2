<?php declare(strict_types=1);

namespace Navplan\Geoname\Domain;

use Navplan\Geometry\Domain\Position2d;


class Geoname {
    public $id;
    public $name;
    public $searchresultname;
    public $feature_class;
    public $feature_code;
    public $country;
    public $admin1;
    public $admin2;
    public $population;
    public $position;
    public $elevation;
    
    public function __construct(
        int $id,
        string $name,
        string $searchresultname,
        string $feature_class,
        string $feature_code,
        string $country,
        string $admin1,
        string $admin2,
        int $population,
        Position2d $position,
        int $elevation
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->searchresultname = $searchresultname;
        $this->feature_class = $feature_class;
        $this->feature_code = $feature_code;
        $this->country = $country;
        $this->admin1 = $admin1;
        $this->admin2 = $admin2;
        $this->population = $population;
        $this->position = $position;
        $this->elevation = $elevation;
    }
}
