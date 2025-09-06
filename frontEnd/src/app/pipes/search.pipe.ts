import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({ name: 'highlightSearch' })
export class HighlightSearchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(text: string, search: string): SafeHtml {
    if (!search) return text;
    const pattern = search.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
    const regex = new RegExp(pattern, "gi");
    const result = text.replace(regex, match => `<span class="highlight">${match}</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}