package io.castled;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import io.castled.apps.ExternalAppType;
import io.castled.apps.connectors.kafka.KafkaAppConfig;
import io.castled.apps.models.GenericSyncObject;
import io.castled.forms.dtos.FormFieldOption;
import io.castled.kafka.KafkaApplicationConfig;
import io.castled.utils.ThreadUtils;
import io.castled.utils.TimeUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.KafkaAdminClient;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.KafkaFuture;

import java.util.List;
import java.util.Properties;
import java.util.Set;

@Slf4j
public class CastledHealthValidator {

    private final KafkaApplicationConfig kafkaApplicationConfig;

    public CastledHealthValidator(KafkaApplicationConfig kafkaApplicationConfig) {
        this.kafkaApplicationConfig = kafkaApplicationConfig;
    }

    public void validateAppHealth() throws Exception {
        validateKafkaServerHealth();
    }

    private void validateKafkaServerHealth() throws Exception {
        Properties properties = new Properties();
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaApplicationConfig.getBootstrapServers());
        try (AdminClient adminClient = KafkaAdminClient.create(properties)) {
            KafkaFuture<Set<String>> topics = adminClient.listTopics().names();
            while (!topics.isDone()) {
                log.info("Waiting for kafka service to come up!!");
                ThreadUtils.interruptIgnoredSleep(TimeUtils.secondsToMillis(10));
            }
        }

    }
}