"use client";

import {
  useId,
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { cx } from "./cx";
import { IconCheck, IconUpload } from "./icons";
import styles from "./FileUpload.module.css";

type FileUploadProps = {
  label: string;
  /** Accepted file types, e.g. "image/*". */
  accept?: string;
  hint?: string;
  required?: boolean;
  /** Called with the chosen file (or null when cleared). */
  onFileSelect?: (file: File | null) => void;
};

export function FileUpload({
  label,
  accept = "image/*",
  hint,
  required,
  onFileSelect,
}: FileUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function accept_(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
    onFileSelect?.(file);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    accept_(e.target.files?.[0]);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    accept_(e.dataTransfer.files?.[0]);
  }

  const hasFile = fileName !== null;

  return (
    <div className={styles.field}>
      <span id={`${id}-label`} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </span>

      <div
        className={cx(
          styles.zone,
          dragOver && styles.zoneDragOver,
          hasFile && styles.zoneFilled,
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          required={required}
          aria-labelledby={`${id}-label`}
          className={styles.nativeInput}
          onChange={onChange}
        />
        {hasFile ? (
          <div className={styles.filled}>
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="" className={styles.thumb} />
            ) : (
              <span className={styles.thumbFallback} aria-hidden="true">
                <IconCheck size={20} />
              </span>
            )}
            <span className={styles.fileMeta}>
              <span className={styles.checkRow}>
                <IconCheck size={16} className={styles.check} />
                <span className={styles.accepted}>Uploaded</span>
              </span>
              <span className={styles.fileName}>{fileName}</span>
            </span>
            <button
              type="button"
              className={styles.replace}
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.prompt}
            onClick={() => inputRef.current?.click()}
          >
            <IconUpload size={22} className={styles.uploadIcon} />
            <span className={styles.promptText}>
              Tap to upload or drag a file here
            </span>
          </button>
        )}
      </div>

      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
