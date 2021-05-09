<?php declare(strict_types=1);

namespace Navplan\Common;

/* use SplEnum; */


class Enum {
    const __default = NULL;

    private $value;


    public function __construct($initial_value = self::__default) {
        $this->value = $initial_value;
    }
}
