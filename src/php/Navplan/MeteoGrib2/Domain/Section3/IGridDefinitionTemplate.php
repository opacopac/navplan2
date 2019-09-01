<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


interface IGridDefinitionTemplate {
    public function getTemplateType(): GridDefinitionTemplateType;
}
