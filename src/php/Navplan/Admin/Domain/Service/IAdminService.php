<?php declare(strict_types=1);

namespace Navplan\Admin\Domain\Service;

use Navplan\Admin\Domain\Model\ImportResponse;


interface IAdminService {
    function importAirspaces(): ImportResponse;

    function importNavaids(): ImportResponse;
}
