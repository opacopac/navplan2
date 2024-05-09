<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Model;

use Exception;


class OgnAprsMessageParser
{
    public function parse(string $aprsMsg): OgnTrafficMessage
    {
        throw new Exception("not implemented");
    }
}
