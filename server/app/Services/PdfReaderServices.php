<?php

namespace App\Services;

use Spatie\PdfToText\Pdf;
use thiagoalessio\TesseractOCR\TesseractOCR;

class PdfReaderServices
{
    public function readPdf(string $filePath): string
    {
        // Try to extract text using Spatie\PdfToText
        try {
            $text = Pdf::getText($filePath);
            if (!empty($text)) {
                return $text;
            }
        } catch (\Exception $e) {
            // Log the exception or handle it as needed
        }

        return $this->extractWithOcr($filePath);
    }

    private function extractWithOcr(string $filePath): string
    {
       $ocr = new TesseractOCR($filePath);

        // Указываем поддерживаемые языки (русский, казахский, английский)
        $ocr->lang('rus', 'kaz', 'eng');

        return $ocr->run();
    }
}


