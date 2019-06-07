<?php declare(strict_types=1);

namespace Navplan\System;

use InvalidArgumentException;


class File implements IFile {
    private $file;


    public function __construct($file) {
        if (!is_resource($file)) {
            throw new InvalidArgumentException("parameter is not of type 'resource'");
        }

        $this->file = $file;
    }


    public function fclose() {
        fclose($this->file);
    }


    public function fseek(int $offset): int {
        return fseek($this->file, $offset);
    }


    public function fread(int $length): string {
        return fread($this->file, $length);
    }
}
