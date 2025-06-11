<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use CurlHandle;
use Navplan\System\Domain\Service\ICurlService;
use Navplan\System\Domain\Service\ILoggingService;
use RuntimeException;


class CurlService implements ICurlService
{
    public function __construct(
        private readonly ILoggingService $loggingService
    )
    {
    }


    public function init(string $url, array $headers = []): CurlHandle|false
    {
        $this->loggingService->debug("initializing cURL for URL '" . $url . "'...");

        $curl = curl_init($url);
        if ($curl === false) {
            $this->loggingService->error("cURL initialization failed for URL '" . $url . "'");
            return false;
        }

        // Set default options
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);

        if (!empty($headers)) {
            $this->setHeaders($curl, $headers);
        }

        return $curl;
    }


    public function setOpt(CurlHandle $curl, int $option, mixed $value): bool
    {
        $this->loggingService->debug("setting cURL option " . $option . " to value '" . json_encode($value) . "'...");

        $result = curl_setopt($curl, $option, $value);
        if (!$result) {
            $this->loggingService->error("failed to set cURL option " . $option);
        }

        return $result;
    }


    public function setHeaders(CurlHandle $curl, array $headers): bool
    {
        $this->loggingService->debug("setting cURL headers...");

        $formattedHeaders = [];
        foreach ($headers as $key => $value) {
            $formattedHeaders[] = "$key: $value";
        }

        $result = curl_setopt($curl, CURLOPT_HTTPHEADER, $formattedHeaders);
        if (!$result) {
            $this->loggingService->error("failed to set cURL headers");
        }

        return $result;
    }


    public function exec(CurlHandle $handle): string|bool
    {
        $this->loggingService->debug("executing cURL request...");

        $response = curl_exec($handle);
        if ($response === false) {
            $error = curl_error($handle);
            $this->loggingService->error("cURL execution failed: " . $error);
            return false;
        }

        $this->loggingService->debug("cURL request executed successfully");
        return $response;
    }


    public function execOrThrow(CurlHandle $handle): string
    {
        $response = $this->exec($handle);
        if ($response === false) {
            throw new RuntimeException("cURL request failed: " . $this->getLastError($handle));
        }

        return $response;
    }


    public function getLastError(CurlHandle $handle): string
    {
        $error = curl_error($handle);
        if ($error) {
            $this->loggingService->error("cURL error: " . $error);
        } else {
            $this->loggingService->debug("no cURL error");
        }
        return $error;
    }


    public function close(CurlHandle $handle): void
    {
        $this->loggingService->debug("closing cURL handle...");

        if (curl_close($handle) === false) {
            $this->loggingService->error("failed to close cURL handle");
        } else {
            $this->loggingService->debug("cURL handle closed successfully");
        }
    }
}
