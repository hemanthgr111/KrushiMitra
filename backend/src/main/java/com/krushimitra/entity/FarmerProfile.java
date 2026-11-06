package com.krushimitra.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "farmer_profiles", uniqueConstraints = {
        @UniqueConstraint(name = "uk_farmer_profiles_user_id", columnNames = "user_id")
})
public class FarmerProfile {

    public static final String[] SUPPORTED_LANGUAGES = {"en", "kn", "hi", "te", "ta", "ml", "mr", "bn", "gu"};

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true, foreignKey = @ForeignKey(name = "fk_farmer_profiles_user"))
    private User user;

    @NotBlank
    @Size(max = 150)
    @Column(name = "farm_name", nullable = false, length = 150)
    private String farmName;

    @NotBlank
    @Size(max = 100)
    @Column(name = "village", nullable = false, length = 100)
    private String village;

    @NotBlank
    @Size(max = 100)
    @Column(name = "district", nullable = false, length = 100)
    private String district;

    @NotBlank
    @Size(max = 100)
    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @NotBlank
    @Pattern(regexp = "^(en|kn|hi|te|ta|ml|mr|bn|gu)$", message = "preferredLanguage must be one of the supported 9 KrushiMitra languages")
    @Column(name = "preferred_language", nullable = false, length = 5)
    private String preferredLanguage;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public FarmerProfile() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
