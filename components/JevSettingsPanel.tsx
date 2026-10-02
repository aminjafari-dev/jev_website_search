"use client";

import {
  DEFAULT_SEARCH_SETTINGS,
  MODEL_OPTIONS,
  STRICTNESS_OPTIONS,
  type SearchSettings,
} from "@/lib/settings";

type JevSettingsPanelProps = {
  settings: SearchSettings;
  onChange: (next: SearchSettings) => void;
  disabled?: boolean;
};

export function JevSettingsPanel({
  settings,
  onChange,
  disabled = false,
}: JevSettingsPanelProps) {
  function patch(partial: Partial<SearchSettings>) {
    onChange({ ...settings, ...partial });
  }

  return (
    <section className="settings-panel" aria-label="Jev search settings">
      <div className="settings-header">
        <div>
          <p className="settings-kicker">Jev controls</p>
          <h2 className="settings-title">Tune how matches are judged</h2>
        </div>
        <button
          type="button"
          className="settings-reset"
          disabled={disabled}
          onClick={() => onChange(DEFAULT_SEARCH_SETTINGS)}
        >
          Reset defaults
        </button>
      </div>

      <div className="settings-grid">
        <label className="setting-card">
          <div className="setting-label-row">
            <span>Min relevance</span>
            <strong>{Math.round(settings.minRelevance * 100)}%</strong>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(settings.minRelevance * 100)}
            disabled={disabled}
            onChange={(event) =>
              patch({ minRelevance: Number(event.target.value) / 100 })
            }
          />
          <p className="setting-hint">
            Live filter: hide products below this Jev score. No re-query needed.
          </p>
        </label>

        <label className="setting-card">
          <div className="setting-label-row">
            <span>Max results</span>
            <strong>{settings.maxResults}</strong>
          </div>
          <input
            type="range"
            min={1}
            max={36}
            step={1}
            value={settings.maxResults}
            disabled={disabled}
            onChange={(event) =>
              patch({ maxResults: Number(event.target.value) })
            }
          />
          <p className="setting-hint">
            Live filter: how many accepted matches to show after ranking.
          </p>
        </label>

        <label className="setting-card">
          <div className="setting-label-row">
            <span>Match strictness</span>
            <strong>
              {
                STRICTNESS_OPTIONS.find(
                  (option) => option.value === settings.strictness,
                )?.label
              }
            </strong>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={STRICTNESS_OPTIONS.findIndex(
              (option) => option.value === settings.strictness,
            )}
            disabled={disabled}
            onChange={(event) =>
              patch({
                strictness:
                  STRICTNESS_OPTIONS[Number(event.target.value)]?.value ??
                  "balanced",
              })
            }
          />
          <p className="setting-hint">
            {
              STRICTNESS_OPTIONS.find(
                (option) => option.value === settings.strictness,
              )?.hint
            }{" "}
            Re-run search to apply.
          </p>
        </label>

        <label className="setting-card">
          <div className="setting-label-row">
            <span>Model</span>
            <strong>{settings.model}</strong>
          </div>
          <select
            className="setting-select"
            value={settings.model}
            disabled={disabled}
            onChange={(event) => patch({ model: event.target.value })}
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="setting-hint">
            Which Jev model answers the relevance questions. Re-run search to
            apply.
          </p>
        </label>
      </div>
    </section>
  );
}
