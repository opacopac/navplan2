<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use InvalidArgumentException;
use Navplan\System\Domain\Model\IFile;


class File implements IFile {
    private $file;


    public function __construct($file) {
        if (!is_resource($file)) {
            throw new InvalidArgumentException("parameter is not of type 'resource'");
        }

        $this->file = $file;
    }


    public function fclose(): bool {
        return fclose($this->file);
    }


    public function fseek(int $offset): int {
        return fseek($this->file, $offset);
    }


    public function fread(int $length): ?string {
        $result = fread($this->file, $length);

        return $result === FALSE ? NULL : $result;
    }


    public function fgets(): ?string {
        $result = fgets($this->file);

        return $result === FALSE ? NULL : $result;
    }


    public function feof(): bool {
        return feof($this->file);
    }
}
