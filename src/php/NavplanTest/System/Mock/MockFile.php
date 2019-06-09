<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\UseCase\IFile;


class MockFile implements IFile {
    /* @var $fcloseResult bool */
    public $fcloseResult;

    /* @var $fseekResult int */
    public $fseekResult;
    /* @var $fseekArgs array */
    public $fseekArgs;

    /* @var $freadResult ?string */
    public $freadResult;
    /* @var $freadArgs array */
    public $freadArgs;

    /* @var $fgetsResult ?string */
    public $fgetsResult;

    /* @var $feofCountUntilResultTrue int */
    public $feofCountUntilResultTrue;


    public function __construct() {
    }


    public function fclose(): bool {
        return $this->fcloseResult;
    }


    public function fseek(int $offset): int {
        return $this->fseekResult;
    }


    public function fread(int $length): ?string {
        return $this->freadResult;
    }


    public function fgets(): ?string {
        return $this->fgetsResult;
    }


    public function feof(): bool {
        if ($this->feofCountUntilResultTrue > 0) {
            $this->feofCountUntilResultTrue--;

            return FALSE;
        }

        return TRUE;
    }
}
