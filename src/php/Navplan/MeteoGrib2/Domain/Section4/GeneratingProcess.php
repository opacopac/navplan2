<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section4;


class GeneratingProcess {
    private $type;
    private $backgroundIdentifier;
    private $model;


    // region GETTER

    public function getType(): int {
        return $this->type;
    }


    public function getBackgroundIdentifier(): int {
        return $this->backgroundIdentifier;
    }


    public function getModel(): int {
        return $this->model;
    }

    // endregion


    public function __construct(
        int $type,
        int $backgroundIdentifier,
        int $model
    ) {
        $this->type = $type;
        $this->backgroundIdentifier = $backgroundIdentifier;
        $this->model = $model;
    }
}
