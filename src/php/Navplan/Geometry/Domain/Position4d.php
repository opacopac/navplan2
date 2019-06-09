<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;


class Position4d extends Position3d {
    /* @var $timestamp Timestamp */
    public $timestamp;


    public function __construct(float $longitude, float $latitude, Altitude $altitude, Timestamp $timestamp) {
        parent::__construct($longitude, $latitude, $altitude);
        $this->timestamp = $timestamp;
    }
}
