<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\UploadedFileInfo;
use Navplan\Common\StringNumberHelper;


class RestFileConverter
{
    const KEY_NAME = "name";
    const KEY_TYPE = "type";
    const KEY_SIZE = "size";
    const KEY_TMP_NAME = "tmp_name";
    const KEY_ERROR = "error";
    const KEY_FULL_PATH = "full_path";


    public static function getUploadedFileInfo(array $args, string $key): UploadedFileInfo
    {
        if (!isset($args[$key])) {
            throw new InvalidArgumentException("missing file argument");
        }

        $fileInfo = $args[$key];

        return new UploadedFileInfo(
            StringNumberHelper::parseStringOrError($fileInfo, self::KEY_NAME),
            StringNumberHelper::parseStringOrError($fileInfo, self::KEY_TYPE),
            StringNumberHelper::parseIntOrError($fileInfo, self::KEY_SIZE),
            StringNumberHelper::parseStringOrError($fileInfo, self::KEY_TMP_NAME),
            StringNumberHelper::parseIntOrError($fileInfo, self::KEY_ERROR),
            StringNumberHelper::parseStringOrError($fileInfo, self::KEY_FULL_PATH)
        );
    }
}
