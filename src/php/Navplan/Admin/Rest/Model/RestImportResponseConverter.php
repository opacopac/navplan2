<?php declare(strict_types=1);

namespace Navplan\Admin\Rest\Model;

use Navplan\Admin\Domain\Model\ImportResponse;


class RestImportResponseConverter {
    public static function toRest(ImportResponse $response): array {
        return array(
            "success" => $response->isSuccess,
            "insertCount" => $response->insertCount
        );
    }
}
