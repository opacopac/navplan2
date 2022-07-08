<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


enum ConsumptionUnit: string {
    case L_PER_H = "L_PER_H";
    case GAL_PER_H = "GAL_PER_H";
}
