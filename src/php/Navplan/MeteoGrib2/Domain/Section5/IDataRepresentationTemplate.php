<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section5;


interface IDataRepresentationTemplate {
    public function getTemplateNumber(): int;
}
