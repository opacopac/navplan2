<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section4;


interface IProductDefinitionTemplate {
    public function getTemplateNumber(): int;
}
