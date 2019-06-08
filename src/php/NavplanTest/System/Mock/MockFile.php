<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\UseCase\IFile;


class MockFile implements IFile {
    /* @var $freadResult string */
    public $freadResult;
    /* @var $fseekResult int */
    public $fseekResult;
    /* @var $fseekArgs array */
    public $fseekArgs;
    /* @var $freadArgs array */
    public $freadArgs;
    /* @var $fcloseArgs array */
    public $fcloseArgs;


    public function __construct() {
    }


    public function fclose() {
        $this->fcloseArgs = [];
    }


    public function fseek(int $offset): int {
        return $this->fseekResult;
    }


    public function fread(int $length): string {
        return $this->freadResult;
    }
}
