<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Spatie\PdfToText\Pdf;
use thiagoalessio\TesseractOCR\TesseractOCR;

class PdfReaderServices
{
    public function readPdf(string $filePath): string
    {
        try {
            $text = Pdf::getText($filePath);
            if (!empty($text)) {
                return $text;
            }
        } catch (\Exception $e) {
            Log::error($e);
        }


        return $this->extractWithOcr($filePath);
    }

    private function extractWithOcr(string $filePath): string
    {
       $ocr = new TesseractOCR($filePath);

        $ocr->lang('rus', 'kaz', 'eng');

        return $ocr->run();
    }
}


